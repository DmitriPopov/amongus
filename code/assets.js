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
  loadSprite("portal", "sprites/portal64.png");
  loadSprite("coin", "sprites/coin.png");
  loadSprite("left", "sprites/left.png");
  loadSprite("right", "sprites/right.png");
  loadSprite("jump", "sprites/jump.png");
  loadSprite("fire", "sprites/fire.png");
  loadSprite("lightbulb", "sprites/evil_lightbulb.png");
  // loadSprite("amongus", "sprites/amongus64.png");
  // loadSprite("amongus_sprite", "sprites/amongus_sprite.png");
  loadSpriteAtlas("sprites/amongus_sprite2.png", {
    amongus: {
      x: 0,
      y: 0,
      width: 320,
      height: 64,
      sliceX: 5,
      sliceY: 1,
      anims: {
        stand: { from: 0, to: 0, speed: 4, loop: true },
        walk: { from: 1, to: 2, speed: 4, loop: true },
        dead: { from: 3, to: 4, speed: 1, loop: false },
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
  loadFont("amongusfont", "sprites/amongusfont.png", 64, 64, { chars: "$L0123456789K" });
}