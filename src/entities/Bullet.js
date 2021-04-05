import pop from "../../pop/index.js";
const { Texture, TileSprite, math } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Bullet extends TileSprite {
  constructor(dir, speed = 100) {
    super(texture, 48, 48);
    this.hitBox = {
      x: 24,
      y: 12,
      w: 24,
      h: 26,
    };
    this.frame.x = 4;
    this.frame.y = 2;
    this.speed = speed;
    this.dir = dir;
    this.life = 3;
  }

  update(dt, t) {
    const { pos, speed, dir } = this;

    // Move in the direction of the path
    pos.x += speed * dt * dir.x;
    pos.y += speed * dt * dir.y;

    if ((this.life -= dt) < 0) {
      this.dead = true;
    }
  }
}

export default Bullet;
