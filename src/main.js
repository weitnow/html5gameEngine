"use strict";

import KeyControls from "../pop/controls/KeyControls.js";
import Game from "../pop/Game.js";
import GameScreen from "./screens/GameScreen.js";

const game = new Game(640, 480);
const controls = new KeyControls();

game.scene = new GameScreen(game, controls);

game.run();
