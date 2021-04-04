import pop from "../pop/index.js";
const { Container, entity } = pop;
import Level from "./Level.js";
import Player from "./entities/Player.js";
import Pickup from "./entities/Pickup.js";
import Bat from "./entities/Bat.js";

class GameScreen extends Container {
  constructor(game, controls) {
    super();
    this.w = game.w;
    this.h = game.h;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos.x = 48;
    player.pos.y = 48;

    this.map = this.add(map);
    this.player = this.add(player);
    this.pickups = this.add(new Container());
    this.populate();

    const bats = this.add(new Container());
    for (let i = 0; i < 1; i++) {
      bats.add(new Bat(() => map.findFreeSpot()));
    }

    //entity.addDebug(this.player);
  }
  populate() {
    const { pickups, map } = this;
    for (let i = 0; i < 5; i++) {
      const p = pickups.add(new Pickup());
      p.pos = map.findFreeSpot();
    }
  }

  update(dt, t) {
    super.update(dt, t);
    const { player, pickups } = this;
    // Collect pickup!
    entity.hits(player, pickups, (p) => {
      p.dead = true;
      if (pickups.children.length === 1) {
        this.populate();
      }
    });
  }
}

export default GameScreen;
