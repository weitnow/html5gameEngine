class KeyControls {
  constructor() {
    this.keys = {};
    // Bind event handlers

    document.addEventListener(
      "keydown",
      (e) => {
        if (
          ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].indexOf(e.key) >=
          0
        ) {
          e.preventDefault();
        }
        this.keys[e.key] = true;
      },
      false
    );

    document.addEventListener(
      "keyup",
      (e) => {
        this.keys[e.key] = false;
      },
      false
    );
  } // End of constructor

  get action() {
    return this.keys[" "];
  }

  get x() {
    // left arrow or A key
    if (this.keys["a"] || this.keys["ArrowLeft"]) {
      return -1;
    }

    // right arrow or D key
    if (this.keys["d"] || this.keys["ArrowRight"]) {
      return 1;
    }
    return 0;
  }

  get y() {
    // up arrow or W key
    if (this.keys["w"] || this.keys["ArrowUp"]) {
      return -1;
    }
    // down arrow or S key
    if (this.keys["s"] || this.keys["ArrowDown"]) {
      return 1;
    }
    return 0;
  }

  key(key, value) {
    if (value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  reset() {
    for (const key in this.keys) {
      this.keys[key] = false;
    }
  }
}

export default KeyControls;
