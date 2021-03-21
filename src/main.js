"use strict";
import pop from "../pop/index.js";
import Squizz from "./entities/Squizz.js";
import Level from "./Level.js";
const { Game, Texture, TileMap, math, KeyControls } = pop;

const game = new Game(640, 320);
const { scene, w, h } = game;

const controls = new KeyControls();
const squizz = new Squizz(controls);
const level = new Level(w, h);

scene.add(level);
scene.add(squizz);
game.run(() => {
  const { pos } = squizz;
  const {
    bounds: { top, bottom, left, right },
  } = level;
  // Confine player pos the bounds area
  pos.x = math.clamp(pos.x, left, right);
  pos.y = math.clamp(pos.y, top, bottom);
  const ground = level.checkGround(squizz.pos);
});
