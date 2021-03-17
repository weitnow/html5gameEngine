"use strict";

import KeyControls from "../pop/controls/KeyControls.js";
import pop from "../pop/index.js";

const { Container, Text, Game, Sprite, Texture } = pop;

const textures = {
  background: new Texture("res/images/bg.png"),
  spaceship: new Texture("res/images/spaceship.png"),
  building: new Texture("res/images/building.png"),
};

// Game setup code
const game = new Game(640, 320);
const { scene, w, h } = game;

// Make a spaceship
const ship = scene.add(new Sprite(textures.spaceship));
ship.scale = { x: 3, y: 0.5 };
ship.rotation = Math.PI / 4;
scene.add(ship);

game.run((dt, t) => {
  ship.pos.x += dt * 100;
  if (ship.pos.x > w) {
    ship.pos.x = -32;
  }
});
