import pop from "../../pop/index.js";
const { Texture, TileSprite } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Player extends TileSprite {
  constructor(controls) {
    super(texture, 48, 48); // 48, 48 = with and height of the player
    this.controls = controls;
    this.speed = 210;
    this.jumping = false;
    this.vel = 0;
  }

  update(dt, t) {
    const { pos, controls, speed } = this;
    const { x } = controls; // No need for 'y'
    const xo = x * dt * speed;
    let yo = 0;

    //Apply som gravity
    if (this.jumping) {
      this.vel += 32 * dt;
      yo += this.vel;
    }

    pos.x += xo; // horizontal influenced by the keyboard
    pos.y += yo; // vertical influenced by "gravity"

    if (!this.jumping && controls.action) {
      // Jump!
      this.vel = -10; // Launch force
      this.jumping = true;
    }

    if (x && !this.jumping) {
      this.frame.x = ((t / 0.1) | 0) % 2;
    }
  }
}

export default Player;
