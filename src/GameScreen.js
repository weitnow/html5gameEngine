import pop from "../pop/index.js";
const { Container, entity, math, Text } = pop;
import Level from "./Level.js";
import Player from "./entities/Player.js";
import Pickup from "./entities/Pickup.js";
import Bat from "./entities/Bat.js";
import Totem from "./entities/Totem.js";
import Ghost from "./entities/Ghost.js";
import State from "../pop/State.js";

class GameScreen extends Container {
  constructor(game, controls, onGameOver) {
    super();
    this.w = game.w;
    this.h = game.h;
    this.controls = controls;
    this.onGameOver = onGameOver;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos = map.findFreeSpot();

    this.state = new State("READY");

    this.map = this.add(map);
    this.pickups = this.add(new Container());
    this.player = this.add(player);

    const baddies = new Container(); // Container for enemies and Bullets

    // Add a couple of Bats
    for (let i = 0; i < 0; i++) {
      this.randoBat(baddies.add(new Bat(player)));
    }
    this.baddies = this.add(baddies);

    // Add a couple of Top-Hat Totems
    for (let i = 0; i < 0; i++) {
      const t = this.add(new Totem(player, (b) => baddies.add(b)));
      const { x, y } = map.findFreeSpot(false); // `false` means "NOT free"
      t.pos.x = x;
      t.pos.y = y;
    }

    // Add a ghost
    const ghost = this.add(new Ghost(player, map));

    this.populate();
    this.score = 0;
    this.scoreText = this.add(
      new Text("0", {
        font: "40pt 'Luckiest Guy', san-serif",
        fill: "#fff",
        align: "center",
      })
    );
    this.scoreText.pos = { x: game.w / 2, y: 180 };
  }

  populate() {
    const { pickups, map } = this;
    for (let i = 0; i < 5; i++) {
      const p = pickups.add(new Pickup());
      p.pos = map.findFreeSpot();
    }
  }

  randoBat(bat) {
    const { w, h } = this; // w and h of the game
    const angle = math.randf(Math.PI * 2); // angle = random float between 0 and (pi * 2) [which is a 360 degree circle in radians]
    bat.pos.x = Math.cos(angle) * 300 + w / 2;
    bat.pos.y = Math.sin(angle) * 300 + h / 2;
    bat.speed = math.rand(70, 150);
    return bat;
  }

  update(dt, t) {
    const { controls, player, state } = this;

    switch (state.get()) {
      case "READY":
        if (state.first) {
          this.scoreText.text = "GET READY";
        }
        if (state.time > 2) {
          this.scoreText.text = "0";
          state.set("PLAYING");
        }
        break;

      case "PLAYING":
        super.update(dt, t);
        this.updatePlaying();
        break;

      case "GAMEOVER":
        if (state.first) {
          player.gameOver = true;
          this.scoreText.text = "DEAD. Score: " + this.score;
        }
        super.update(dt, t);

        // If player dead, wait for space bar
        if (player.gameOver && controls.action) {
          this.onGameOver();
        }
        break;
    }

    state.update(dt);
  }

  updatePlaying() {
    const { baddies, player, pickups, state } = this;
    baddies.map((baddie) => {
      if (entity.hit(player, baddie)) {
        state.set("GAMEOVER");
        baddie.dead = true;
      }
    });

    // Collect pickup!
    entity.hits(player, pickups, (p) => {
      p.dead = true;
      this.score++;
      if (pickups.children.length === 1) {
        this.populate();
        this.score += 5;
      }
      this.scoreText.text = this.score;
    });
  }
}

export default GameScreen;
