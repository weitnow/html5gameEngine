"use strict";

import KeyControls from "../pop/controls/KeyControls.js";
import pop from "../pop/index.js";
import Sprite from "../pop/Sprite.js";
import Texture from "../pop/Texture.js";

const { Container, CanvasRenderer, Text } = pop;

// Game setup code
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w, h);
document.querySelector("#board").appendChild(renderer.view);

//Game objects
const scene = new Container();
const bullets = new Container();

// Load game textures
const textures = {
  background: new Texture("res/Images/bg.png"),
  spaceship: new Texture("res/Images/spaceship.png"),
  bullet: new Texture("res/Images/bullet.png"),
  baddie: new Texture("res/Images/baddie.png"),
};

const controls = new KeyControls();

function fireBullet(x, y) {
  const bullet = new Sprite(textures.bullet);
  bullet.pos.x = x;
  bullet.pos.y = y;
  bullet.update = function (dt) {
    this.pos.x += 400 * dt;

    if (bullet.pos.x >= w + 20) {
      bullet.dead = true;
    }
  };
  bullets.add(bullet);
}

// Make a spaceship
const ship = new Sprite(textures.spaceship);
ship.pos.x = 120;
ship.pos.y = h / 2 - 16;
ship.update = function (dt, t) {
  // Update the player position
  const { pos } = this;
  pos.x += controls.x * dt * 200;
  pos.y += controls.y * dt * 200;

  if (pos.x < 0) pos.x = 0;
  if (pos.x > w) pos.x = w;
  if (pos.y < 0) pos.y = 0;
  if (pos.y > h) pos.y = h;
};

// Bad guys
const baddies = new Container();
function spawnBaddie(x, y, speed) {
  const baddie = new Sprite(textures.baddie);
  baddie.pos.x = x;
  baddie.pos.y = y;
  baddie.update = function (dt) {
    this.pos.x += speed * dt;
  };
  baddies.add(baddie);
}

//Add the score game object
const score = new Text("score:", {
  font: "20px sans-serif",
  fill: "#8B8994",
  align: "center",
});
score.pos.x = w / 2;
score.pos.y = h - 30;

// Add everything to the scene container
scene.add(new Sprite(textures.background));
scene.add(ship);
scene.add(bullets);
scene.add(baddies);
scene.add(score);

// Game state variables
let lastShot = 0;

let lastSpawn = 0;
let spawnSpeed = 1.0;

let scoreAmount = 0;
let gameOver = false;

function doGameOver() {
  const gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "#8B8994",
    align: "center",
  });
  gameOverMessage.pos.x = w / 2;
  gameOverMessage.pos.y = 120;

  scene.add(gameOverMessage);
  scene.remove(ship);
  gameOver = true;
}

// game loop

let dt = 0;
let last = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // Game logic code

  score.text = "score: " + scoreAmount;

  if (controls.action && t - lastShot > 0.15) {
    lastShot = t;
    fireBullet(ship.pos.x + 24, ship.pos.y + 10);
  }

  // Spawn bad guys
  if (t - lastSpawn > spawnSpeed) {
    lastSpawn = t;
    const speed = -50 - Math.random() * Math.random() * 100;
    const position = Math.random() * (h - 24);
    spawnBaddie(w, position, speed);

    // Accelerating for the next spawn
    spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001;
  }

  // Check for collisions, or out of screen

  baddies.children.forEach((baddie) => {
    //Check if out of screen
    if (baddie.pos.x < -32) {
      if (!gameOver) {
        doGameOver();
      }
      baddie.dead = true;
    }
    bullets.children.forEach((bullet) => {
      const dx = baddie.pos.x + 16 - (bullet.pos.x + 8);
      const dy = baddie.pos.y + 16 - (bullet.pos.y + 8);

      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        // A hit!
        baddie.dead = true;
        bullet.dead = true;
        scoreAmount += Math.floor(t);
      }
    });
  });

  scene.update(dt, t);
  renderer.render(scene);
}

requestAnimationFrame(loopy);
