class Anim {
  constructor(frames, rate) {
    this.frames = frames;
    this.rate = rate;
    this.reset();
  }

  update(dt) {
    const { rate, frames } = this;
    if ((this.curTime += dt) > rate) {
      this.curFrame++;
      this.frame = frames[this.curFrame % frames.length];
      this.curTime -= rate;
    }
  }

  reset() {
    this.frame = this.frames[0];
    this.curFrame = 0;
    this.curTime = 0;
  }
}

class AnimManager {
  constructor(e) {
    this.anims = {};
    this.running = false;
    this.frameSource = e.frame || e;
    this.current = null;
  }
  add(name, frames, speed) {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }
  update(dt) {
    const { current, anims, frameSource, ent } = this;
    if (!current) {
      return; // bail!
    }
    const anim = anims[current];
    anim.update(dt);

    // Sync the TileSprite frame
    frameSource.x = anim.frame.x;
    frameSource.y = anim.frame.y;
  }
  play(anim) {
    const { current, anims } = this;
    if (anim === current) {
      return;
    }
    this.current = anim;
    anims[anim].reset();
  }

  stop() {
    this.current = null;
  }
}

export default AnimManager;
