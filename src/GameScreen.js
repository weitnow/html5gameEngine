import pop from "../pop/index.js";
const { Container, Rect } = pop;
import Player from "./entities/Player.js";

class GameScreen extends Container {
  constructor(game, controls) {
    super();
    this.w = game.w;
    this.h = game.h;

    this.bg = this.add(new Rect(this.w, this.h));
    this.player = this.add(new Player(controls));
    this.player.pos.x = this.w / 2 - 16;
    this.player.pos.y = this.h / 2;
  }

  update(dt, t) {
    super.update(dt, t);
    const { player, w, h } = this;

    // Check if hit ground and if so cancel gravitiy forces
    if (player.pos.y > h / 2) {
      player.pos.y = h / 2;
      this.player.jumping = false;
    }

    // Screen wrap
    if (player.pos.x < -48) {
      player.pos.x = w;
    }
    if (player.pos.x > w) {
      player.pos.x = -48;
    }
  }
}

export default GameScreen;
