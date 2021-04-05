import pop from "../../pop/index.js";
import Bullet from "./Bullet.js";
const { Texture, TileSprite, math, entity } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Totem extends TileSprite {
  constructor(target, onFire) {
    super(texture, 48, 48);
    this.type = "Totem";
    this.frame.x = 0;
    this.frame.y = 1;
    this.target = target;
    this.onFire = onFire;
    this.fireIn = 0;
  }

  fireAtTarget() {
    const { target, onFire } = this;
    const totemPos = entity.center(this);
    const targetPos = entity.center(target);
    const angle = math.angle(targetPos, totemPos);

    const x = Math.cos(angle);
    const y = Math.sin(angle);

    const bullet = new Bullet({ x, y }, 300);
    bullet.pos.x = totemPos.x;
    bullet.pos.y = totemPos.y - bullet.h / 2;

    onFire(bullet);
  }

  update(dt, t) {
    if (math.randOneIn(250)) {
      this.fireIn = 1;
    }

    if (this.fireIn > 0) {
      this.fireIn -= dt;
      // Telegraph to the player that Totem is about to fire
      this.frame.x = [1, 0][Math.floor(t / 0.1) % 2];
      if (this.fireIn < 0) {
        this.fireAtTarget();
      }
    }
  }
}

export default Totem;
