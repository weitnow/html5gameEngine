import pop from "../../pop/index.js";
const { Texture, TileSprite, math, entity } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Bat extends TileSprite {
  constructor(findWaypoint) {
    super(texture, 48, 48);
    this.hitBox = {
      x: 6,
      y: 6,
      w: 30,
      h: 26,
    };
    this.frame.x = 3;
    this.frame.y = 1;
    this.speed = math.rand(50, 100);
    this.findWaypoint = findWaypoint;
    this.waypoint = findWaypoint();
  }

  update(dt, t) {
    const { pos, dir, speed, waypoint } = this;
    //Move in the directon of the path
    const xo = waypoint.x - pos.x;
    const yo = waypoint.y - pos.y;
    //console.log(`xo: %s xy: %s`, xo, yo);
    const step = speed * dt;
    const xIsClose = Math.abs(xo) <= step;
    const yIsClose = Math.abs(yo) <= step;

    if (!xIsClose) {
      pos.x += speed * (xo > 0 ? 1 : -1) * dt;
    }

    if (!yIsClose) {
      pos.y += speed * (yo > 0 ? 1 : -1) * dt;
    }

    if (xIsClose && yIsClose) {
      // New way point
      this.waypoint = this.findWaypoint();
    }
  }
}

export default Bat;
