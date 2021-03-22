import Container from "./Container";
import math from "./utils/math.js";

class Camera extends Container {
  /**
   * viewport = size of camera (object with w and h)
   * worldSize = boundaires of camera (object with w and h)
   *
   */

  constructor(subject, viewport, worldSize = viewport) {
    super();
    this.w = viewport.w;
    this.h = viewport.h;
    this.worldSize = worldSize;
    this.setSubject(subject);
  }
  setSubject(e) {
    this.subject = e ? e.pos || e : this.pos;
    this.offset = { x: 0, y: 0 };

    // Center of the entity
    if (e && e.w) {
      this.offset.x += e.w / 2;
      this.offset.y += e.h / 2;
    }
    if (e && e.anchor) {
      this.offset.x -= e.anchor.x;
      this.offset.y -= e.anchor.y;
    }
  }
  focus() {
    const { pos, w, h, worldSize, subject, offset } = this;
    const centeredX = subject.x + offset.x - w / 2;
    const maxX = worldSize.w - w;
    const x = -math.clamp(centeredX, 0, maxX);

    const centeredY = subject.y + offset.y - h / 2;
    const maxY = worldSize.h - h;
    const y = -math.clamp(centeredY, 0, maxY);

    pos.x = x;
    pos.y = y;
  }
  update(dt, t) {
    super.update(dt, t);
    if (this.subject) {
      this.focus();
    }
  }
}

export default Camera;
