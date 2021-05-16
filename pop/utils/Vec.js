class Vec {
  static from(v) {
    return new Vec().copy(v);
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  mag() {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  copy({ x, y }) {
    this.x = x;
    this.y = y;
    return this;
  }

  add({ x, y }) {
    this.x += x;
    this.y += y;
    return this;
  }

  multiply(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  clone() {
    return Vec.from(this);
  }
}

export default Vec;
