import pop from "../../pop/index.js";
const { Texture, TileSprite, math } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Totem extends TileSprite {
  constructor(target, onFire) {
    super(texture, 48, 48);
    this.frame.x = 0;
    this.frame.y = 1;
    this.target = target;
    this.onFire = onFire;
    this.fireIn = 0;
  }
}

export default Totem;
