import pop from "../../pop/index.js";
const { TileSprite, Texture } = pop;

const texture = new Texture("res/images/bravedigger-tiles.png");

class TestSprite extends TileSprite {
  constructor() {
    super(texture, 48, 48);
    this.frame.x = 3;
    this.frame.y = 1;
  }
}

export default TestSprite;
