import pop from "../../pop/index.js";
const { Texture, TileSprite, wallslide } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Player extends TileSprite {
  constructor(controls, map) {
    super(texture, 48, 48); // 48, 48 = with and height of the player
    this.controls = controls;
    this.map = map;
    this.speed = 210;
    this.anchor = { x: 0, y: 0 };

    //kec modification
    this.hitBox = { x: 9, y: 18, w: 30, h: 28 };
  }

  update(dt, t) {
    const { pos, controls, map, speed } = this;

    let { x, y } = controls;
    const xo = x * dt * speed;
    const yo = y * dt * speed;

    // Can we move to this position?
    const r = wallslide(this, map, xo, yo);
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
