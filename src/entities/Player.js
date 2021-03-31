import pop from "../../pop/index.js";
const { Texture, TileSprite, deadInTracks } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Player extends TileSprite {
  constructor(controls, map) {
    super(texture, 48, 48);
    this.controls = controls;
    this.map = map;
    this.speed = 210;
    this.anchor = { x: 0, y: 0 };
  }

  update(dt, t) {
    const { pos, controls, map, speed } = this;

    let { x, y } = controls;
    const xo = x * dt * speed;
    const yo = y * dt * speed;

    // Can we move to this position?
    const r = deadInTracks(this, map, xo, yo);
    pos.x += r.x;
    pos.y += r.y;

    // Animate!
    if (xo || yo) {
      // Walking frames
      this.frame.x = ((t / 0.08) | 0) % 4;
      // Walking left or right?
      if (xo < 0) {
        this.scale.x = -1;
        this.anchor.x = 48;
      }
      if (xo > 0) {
        this.scale.x = 1;
        this.anchor.x = 0;
      }
    } else {
      // Just hanging out
      this.frame.x = (((t / 0.2) | 0) % 2) + 4;
    }
  }
}

export default Player;
