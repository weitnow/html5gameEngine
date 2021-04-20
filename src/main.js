"use strict";

import pop from "../pop/index.js";
const { Game, KeyControls } = pop;
import GameScreen from "./GameScreen.js";
import ScreenTheDungeon from "./ScreenTheDungeon.js";

const game = new Game(48 * 19, 48 * 11); // Game Object hat a a this.renderer and a this.scene (container) property
const keys = new KeyControls();
function startGame() {
  game.scene = new GameScreen(game, keys, startGame);
}
function startTheDungeon() {
  game.scene = new ScreenTheDungeon(game, keys);
}
startGame();
//startTheDungeon();
game.run();
