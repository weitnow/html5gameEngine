class MouseControls {
  constructor(container) {
    this.el = container || document.body;
    // State
    this.pos = { x: 0, y: 0 };
    this.isDown = false;
    this.pressed = false;
    this.released = false;
    // Handlers
    document.addEventListener("mousemove", this.move.bind(this), false);
    document.addEventListener("mousedown", this.down.bind(this), false);
    document.addEventListener("mouseup", this.up.bind(this), false);
  }

  mousePosFromEvent({ clientX, clientY }) {
    const { el, pos } = this; // el = canvas
    const rect = el.getBoundingClientRect();
    const xr = el.width / el.clientWidth;
    const yr = el.height / el.clientHeight;
    pos.x = (clientX - rect.left) * xr;
    pos.y = (clientY - rect.top) * yr;
  }

  move(e) {
    this.mousePosFromEvent(e);
  }

  down(e) {
    this.isDown = true;
    this.pressed = true;
    this.mousePosFromEvent(e);
  }

  up() {
    this.isDown = false;
    this.released = true;
    this.pressed = false;
  }

  update() {
    this.released = false;
    this.pressed = false;
  }
}

export default MouseControls;
