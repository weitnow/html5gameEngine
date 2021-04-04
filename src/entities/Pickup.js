import pop from "../../pop/index.js";
const { Texture, TileSprite } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class Pickup extends TileSprite {
  constructor() {
    super(texture, 48, 48);
    this.frame.x = 5;
    this.frame.y = 2;
  }
}

export default Pickup;
