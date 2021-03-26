import Container from "../../pop/Container";
import Sprite from "../../pop/Sprite";
import Texture from "../../pop/Texture";

const texture = new Texture("res/images/logo-mompop.png");

class LogoScreen extends Container {
  constructor(game, onDone) {
    super();
    this.onDone = onDone;
    this.life = 2;
    const logo = this.add(new Sprite(texture));
    logo.pos = { x: 220, y: 130 };
  }

  update(dt, t) {
    super.update(dt, t);

    this.life -= dt;
    if (this.life < 0) {
      this.onDone();
    }
  }
}

export default LogoScreen;
