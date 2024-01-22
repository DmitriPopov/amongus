import kaboom from "kaboom";
import big from "./big";
import patrol from "./patrol";
import loadAssets from "./assets";

const canvas = document.getElementById('app')
kaboom({ canvas, background: [72, 0, 255] });

const touchEndActions = []
canvas.addEventListener('touchend', (e) => {
  [...e.changedTouches].forEach((t) => {
    touchEndActions.forEach((action) => {
      action(t.identifier, vec2(t.clientX, t.clientY).scale(1 / canvas.scale))
    })
  }
  )
})

function onTouchEnd(action){
  touchEndActions.push(action)
  return () => {
    const idx = touchEndActions.findIndex(a => a === action)
    if (idx >= 0) {
      touchEndActions.splice(idx, 1)
    }
  }
}

loadAssets();

// define some constants
const JUMP_FORCE = 1100;
const MOVE_SPEED = 390;
const FALL_DEATH = 2400;
const LIVES_COUNT = 3;

const LEVELS = [
  [
    "                    ",
    "=================  =",
    "#################  #",
    "#                  #",
    "#                  #",
    "#    $ > $ H<      #",
    "#  #################",
    "#                  #",
    "#     $     $      #",
    "#     #     #      #",
    "#  $> #^ $  #<$   @#",
    "#####################",
  ],
  [
    "     #######################",
    "                           ",
    "                 #          ",
    "                 ##         ",
    "     H ^ > <   #####   $   @",
    "#############################",
  ],
  ["   =>    #   #   ^      $ @", "############################"],
  [
    "      $ $  ^              ",
    "  ^   =======     ^        ",
    "  =     $$          =   $$ @",
    "=============================",
  ],
  [
    "                      # ^> $$         @             ",
    "                     ================               ",
    "            ",
    "   #   ^ $  ^ $  ^ $   ",
    "===========================",
  ],
  [
    "               $$     >",
    "              ==========                         ",
    "                                       ",
    "       ^     #  $$    ^      $  $      @   ",
    "==========================================",
  ],
  [
    "                  ^    $$$                            ",
    "               ==================                     ",
    "             ==                                     ",
    "                                                   ",
    "                                               ",
    "      $   ^   $   ^ $   ^ $  ^       $$$         @    ",
    " ================================================ ",
  ],
  [
    "                                               ",
    "        #      ^ $$   >    ^     $$          @   ",
    "==============================================   ",
  ],
  [
    "                                               ",
    "      ^ $$ #        ^     $$        ^  $$     @       ",
    "==============  ================================   ",
  ],
  [
    "      #                      ^                   ",
    "      =                    =%=                   ",
    "    =     ^   $$                  ^  $   ^  $    @  ",
    "==================================================  ",
  ],
];

// define what each symbol means in the level graph
const levelConf = {
  // grid size
  width: 64,
  height: 64,
  // define each object as a list of components
  "=": () => [sprite("grass"), area(), solid(), origin("bot")],
  "#": () => [sprite("brick"), area(), solid(), origin("bot")],
  $: () => [sprite("coin"), area(), pos(0, -9), origin("bot"), "coin"],
  "%": () => [sprite("prize"), area(), solid(), origin("bot"), "prize"],
  "^": () => [sprite("spike"), area(), solid(), origin("bot"), "danger"],
  "*": () => [sprite("apple"), area(), origin("bot"), body(), "apple"],
  H: () => [sprite("heart"), area(), origin("bot"), body(), "heart"],
  ">": () => [
    sprite("ghosty"),
    area(),
    origin("bot"),
    body(),
    patrol(),
    "enemy",
  ],
  "<": () => [
    sprite("skull"),
    area(),
    origin("bot"),
    body(),
    patrol(),
    "enemy",
  ],
  "@": () => [
    sprite("portal"),
    area({ scale: 0.5 }),
    origin("bot"),
    pos(0, -12),
    "portal",
  ],
};

scene(
  "game",
  ({ levelId, coins, lives } = { levelId: 0, coins: 0, lives: 3 }) => {
    gravity(3200);

    // add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], levelConf);

    let isDead = false;

    // define player object
    const player = add([
      sprite("amongus"),
      pos(0, 0),
      area(),
      scale(1),
      // makes it fall to gravity and jumpable
      body(),
      // the custom component we defined above
      big(),
      origin("bot"),
    ]);

    const leftButton = add([
      sprite("left"),
      pos(10, height() - 100),
      opacity(0.5),
      fixed(),
      area(),
    ]);

    const rightButton = add([
      sprite("right"),
      pos(150, height() - 100),
      opacity(0.5),
      fixed(),
      area(),
    ]);

    const jumpButton = add([
      sprite("jump"),
      pos(width() - 100, height() - 100),
      opacity(0.5),
      fixed(),
      area(),
    ]);

    const keyDown = {
      left: false,
      right: false,
      jump: false,
    };

    onTouchStart((id, pos) => {
      if (leftButton.hasPoint(pos)) {
        keyDown.left = true;
        leftButton.opacity = 1;
      } else if (rightButton.hasPoint(pos)) {
        keyDown.right = true;
        rightButton.opacity = 1;
      } else if (jumpButton.hasPoint(pos)) {
        jump();
        jumpButton.opacity = 1;
      }
    });

    const onTouchChanged = (_, pos) => {
      if (!leftButton.hasPoint(pos)) {
        keyDown.left = false;
        leftButton.opacity = 0.5;
      }
      if (!rightButton.hasPoint(pos)) {
        keyDown.right = false;
        rightButton.opacity = 0.5;
      }
      if (!jumpButton.hasPoint(pos)) {
        jumpButton.opacity = 0.5;
      }
    };

    onTouchMove(onTouchChanged);
    onTouchEnd(onTouchChanged);

    player.play("stand");

    const goWithLevel = (levelId, coins, lives) => {
      if (lives == 0) {
        go("lose");
      } else {
        isDead = false;
        go("game", { levelId: levelId, coins: coins, lives: lives });
      }
    };
    // action() runs every frame
    player.onUpdate(() => {
      // center camera to player
      camPos(player.pos);
      // check fall death
      if (player.pos.y >= FALL_DEATH) {
        goWithLevel(levelId, coins, --lives);
      }
    });

    // if player onCollide with any obj with "danger" tag, lose
    player.onCollide("danger", () => {
      isDead = true;
      play("hit");
      // player.stop
      player.play("dead");
      // setTimeout(()=>goWithLevel(levelId, coins, --lives), 1000)
      wait(2, () => goWithLevel(levelId, coins, --lives));
    });

    player.onCollide("portal", () => {
      play("portal");
      if (levelId + 1 < LEVELS.length) {
        go("game", {
          levelId: levelId + 1,
          coins: coins,
          lives: lives,
        });
      } else {
        go("win");
      }
    });

    player.onGround((l) => {
      if (l.is("enemy")) {
        player.jump(JUMP_FORCE * 1.5);
        destroy(l);
        addKaboom(player.pos);
        play("powerup");
      }
    });

    player.onCollide("enemy", (e, col) => {
      // if it's not from the top, die
      if (!col.isBottom()) {
        isDead = true;
        play("hit");
        //player.stop;
        player.play("dead");
        // setTimeout(()=>goWithLevel(levelId, coins, --lives), 1000)
        wait(2, () => goWithLevel(levelId, coins, --lives));
        // goWithLevel(levelId, coins, --lives)
      }
    });

    let hasApple = false;

    // grow an apple if player's head bumps into an obj with "prize" tag
    player.onHeadbutt((obj) => {
      if (obj.is("prize") && !hasApple) {
        const apple = level.spawn("#", obj.gridPos.sub(0, 1));
        apple.jump();
        hasApple = true;
        play("blip");
      }
    });

    // player grows big onCollide with an "apple" obj
    player.onCollide("apple", (a) => {
      destroy(a);
      // as we defined in the big() component
      player.biggify(3);
      hasApple = false;
      play("powerup");
    });

    let coinPitch = 0;

    onUpdate(() => {
      if (coinPitch > 0) {
        coinPitch = Math.max(0, coinPitch - dt() * 100);
      }
      if (keyDown.left) {
        moveLeft();
      } else if (keyDown.right) {
        moveRight();
      }
      if ((!keyDown.left)&&(!keyDown.right)&&(!isDead)){
        player.play('stand')
      }
    });

    player.onCollide("coin", (c) => {
      destroy(c);
      play("coin", {
        detune: coinPitch,
      });
      coinPitch += 100;
      coins += 1;
      coinsLabel.text = getCoinsLabel(coins, lives);
    });

    player.onCollide("heart", (c) => {
      destroy(c);
      play("coin", {
        detune: coinPitch,
      });
      coinPitch += 100;
      lives += 1;
      coinsLabel.text = getCoinsLabel(coins, lives);
    });

    const getCoinsLabel = (coins, lives) => {
      return coins + "$ " + lives + "L";
    };

    const coinsLabel = add([
      text(getCoinsLabel(coins, lives), { font: "amongusfont", size: 32 }),
      pos(24, 24),
      fixed(),
    ]);

    const jump = () => {
      if (isDead) return;

      // these 2 functions are provided by body() component
      if (player.isGrounded()) {
        player.jump(JUMP_FORCE);
      }
    };

    // jump with space
    onKeyPress("space", jump);

    const moveLeft = () => {
      if (isDead) return;

      player.flipX(true);
      player.move(-MOVE_SPEED, 0);
      if (player.curAnim() !== "walk" && !isDead) {
        //   console.log(player.curAnim(), isDead)
        player.play("walk");
      }
    };

    onKeyDown("left", () => {
      keyDown.left = true;
    });

    onKeyRelease("left", () => {
      if (!isDead) {
        player.play("stand");
      }
      keyDown.left = false;
    });

    onKeyRelease("right", () => {
      if (!isDead) {
        player.play("stand");
      }
      keyDown.right = false;
    });

    const moveRight = () => {
      if (isDead) return;
      // console.log(isDead)

      player.flipX(false);
      player.move(MOVE_SPEED, 0);
      if (player.curAnim() !== "walk" && !isDead) {
        //   console.log(player.curAnim(), isDead)
        player.play("walk");
      }
    };

    onKeyDown("right", () => {
      keyDown.right = true;
    });

    onKeyPress("down", () => {
      player.weight = 3;
    });

    onKeyRelease("down", () => {
      player.weight = 1;
    });

    onKeyPress("f", () => {
      fullscreen(!fullscreen());
    });
  }
);

scene("lose", (levelId, coins) => {
  let background = add([
    sprite("youloose"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    origin("center"),
    // Allow the background to be scaled
    scale(1),
    // Keep the background position fixed even when the camera moves
    fixed(),
  ]);

  onKeyPress(() => go("game"));
});

scene("win", () => {
  let background = add([
    sprite("youwin"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    origin("center"),
    // Allow the background to be scaled
    scale(1),
    // Keep the background position fixed even when the camera moves
    fixed(),
  ]);

  onKeyPress(() => go("game"));
});

const music = play("bgmusic", { loop: true });
go("game");
