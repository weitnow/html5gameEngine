import pop from "../../pop/index.js";
import State from "../../pop/State.js";
const { entity, Texture, TileSprite, math } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Ghost extends TileSprite {
  constructor(target, map) {
    super(texture, 48, 48);
    this.hitBox = {
      x: 6,
      y: 3,
      w: 32,
      h: 32,
    };
    this.frame.x = 5;
    this.frame.y = 1;
    this.speed = 100;
    this.target = target;
    this.waypoint = null;
    this.map = map;
    this.pos = map.findFreeSpot();
    this.path = this.findPath();
  }
  update(dt, t) {
    this.followPath(dt);
  }

  findPath() {
    // Calculate the pathfinding path
    const { map, target } = this;
    const s = map.pixelToMapPos(entity.center(this)); //source
    const d = map.pixelToMapPos(entity.center(target)); //destination
    map.path.findPath(s.x, s.y, d.x, d.y, (path) => {
      this.path = path || [];
    });
    map.path.calculate();
  }

  followPath(dt) {
    const { map, speed, path, pos, hitBox } = this;
    if (!path.length) {
      return; // We've finished follwing the path
    }

    // Move in the direction of the path
    const cell = this.path[0];
    // Move in the direction of the path
    const xo = cell.x * map.tileW - (pos.x - hitBox.x);
    const yo = cell.y * map.tileH - (pos.y - hitBox.y);

    const closeX = Math.abs(xo) <= 2;
    const closeY = Math.abs(yo) <= 2;
    if (!closeX) pos.x += Math.sign(xo) * speed * dt;
    if (!closeY) pos.y += Math.sign(yo) * speed * dt;

    // If you made it, move to the next path element
    if (closeX && closeY) {
      this.path = path.slice(1);
      if (this.path.length === 0) {
        this.findPath();
      }
    }
  }
}

export default Ghost;
