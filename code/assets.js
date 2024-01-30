export default function loadAssets() {
  //loadSprite("bean", "sprites/bean.png");
  loadSprite("ghosty", "sprites/ghosty.png");
  loadSprite("skull", "sprites/skull.png");
  loadSprite("spike", "sprites/spike.png");
  loadSprite("grass", "sprites/grass.png");
  loadSprite("prize", "sprites/jumpy.png");
  loadSprite("chest", "sprites/chest.png");
  loadSprite("knife", "sprites/knife.png");
  // loadSprite("apple", "sprites/apple.png");
  loadSprite("heart", "sprites/heart.png");
  //loadSprite("portal", "sprites/portal64.png");
  loadSpriteAtlas("sprites/portal64anim.png", {
    portal: {
      x: 0,
      y: 0,
      width: 256,
      height: 64,
      sliceX: 4,
      sliceY: 1,
      anims: {
        whirl: { from: 0, to: 3, speed: 4, loop: true }
      },
    },
  });
  loadSpriteAtlas("sprites/torch.png", {
    torch: {
      x: 0,
      y: 0,
      width: 192,
      height: 128,
      sliceX: 3,
      sliceY: 2,
      anims: {
        fire: { from: 0, to: 5, speed: 4, loop: true }
      },
    },
  });
  loadSpriteAtlas("sprites/introportalanim.png", {
    introportal: {
      x: 0,
      y: 0,
      width: 320,
      height: 64,
      sliceX: 5,
      sliceY: 1,
      anims: {
        close: { from: 0, to: 4, speed: 4, loop: false }
      },
    },
  });
  loadSprite("coin", "sprites/coin.png");
  loadSprite("left", "sprites/left.png");
  loadSprite("right", "sprites/right.png");
  loadSprite("jump", "sprites/jump.png");
  loadSprite("fire", "sprites/fire.png");
  loadSprite("lightbulb", "sprites/evil_lightbulb.png");
  loadSprite("levelbg", "sprites/levelbg.png");
  loadSprite("evilclown", "sprites/evilclown.png");
  // loadSprite("amongus", "sprites/amongus64.png");
  // loadSprite("amongus_sprite", "sprites/amongus_sprite.png");
  loadSpriteAtlas("sprites/amongus_sprite2.png", {
    amongus: {
      x: 0,
      y: 0,
      width: 512,
      height: 64,
      sliceX: 8,
      sliceY: 1,
      anims: {
        stand: { from: 0, to: 0, speed: 4, loop: true },
        walk: { from: 1, to: 2, speed: 4, loop: true },
        dead: { from: 3, to: 4, speed: 1, loop: false },
        deadelectro: { from: 6, to: 5, speed: 4, loop: true },
        deadknife: { from: 7, to: 7, speed: 4, loop: false },
      },
    },
  });
  loadSprite("brick", "sprites/brick64.png");
  loadSprite("youloose", "sprites/game_over2.png");
  loadSprite("youwin", "sprites/victory.png");
  loadSound("coin", "sounds/score.mp3");
  loadSound("powerup", "sounds/powerup.mp3");
  loadSound("blip", "sounds/blip.mp3");
  loadSound("hit", "sounds/hit.mp3");
  loadSound("portal", "sounds/portal.mp3");
  loadSound("bgmusic", "sounds/bgmusic.mp3");
  loadSound("slash", "sounds/slash.wav");
  loadSound("victory", "sounds/victory.mp3");
  loadSound("defeat", "sounds/defeat.mp3");
  loadSound("electrodeath", "sounds/electrodeath.wav");
  loadFont("amongusfont", "sprites/amongusfont.png", 64, 64, { chars: "$L0123456789K:" });
}