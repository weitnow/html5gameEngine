import pop from "../pop/index.js";
const { TileMap, Texture, math } = pop;

import EasyStar from "easystarjs";
//Create a pathfinding object
const path = new EasyStar.js();

const texture = new Texture("res/images/bravedigger-tiles.png");

class Level extends TileMap {
  constructor(w, h) {
    const tileSize = 48;
    const mapW = Math.floor(w / tileSize);
    const mapH = Math.floor(h / tileSize);

    const tileIndexes = [
      { id: "empty", x: 0, y: 2, walkable: true },
      { id: "wall", x: 2, y: 2 },
      { id: "wall_end", x: 3, y: 2 },
    ];

    const getTile = (id) => tileIndexes.find((t) => t.id == id);
    // find gibt den wert eines arrays zurück welches als erstes die bedingung erfüllt

    const getIdx = (id) => tileIndexes.indexOf(getTile(id));
    // indexOf gibt den Index zurück, an dem ein bestimmtes Element im Array zu erstenmal auftritt,

    // Make a random dungeon
    const level = Array(mapW * mapH).fill(0);

    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        // 1. Map borders
        if (y === 0 || x === 0 || y === mapH - 1 || x === mapW - 1) {
          level[y * mapW + x] = 1;
          continue;
        }

        // 2. Grid points - randomly skip to make "rooms"

        if (y % 2 || x % 2 || math.randOneIn(4)) {
          continue; // don't draw a wall, please
        }

        level[y * mapW + x] = 1;

        // 3. Side walls - pick a random direction
        const [xo, yo] = math.randOneFrom([
          [0, -1],
          [0, 1],
          [1, 0],
          [-1, 0],
        ]);
        level[(y + yo) * mapW + (x + xo)] = 1;
      }
    }

    // "3d-ify" if no wall below a tile
    for (let y = 0; y < mapH - 1; y++) {
      for (let x = 0; x < mapW; x++) {
        const below = level[(y + 1) * mapW + x];
        const me = level[y * mapW + x];
        if (me === getIdx("wall") && below !== getIdx("wall")) {
          level[y * mapW + x] = getIdx("wall_end");
        }
      }
    }

    super(
      level.map((i) => tileIndexes[i]),
      mapW,
      mapH,
      tileSize,
      tileSize,
      texture
    );

    // Translate the one-dimensional level into path-finder 2d array
    const grid = [];
    for (let i = 0; i < level.length; i += mapW) {
      grid.push(level.slice(i, i + mapW));
    }
    path.setGrid(grid); // if the level changes, recalculate grid with setgrid again

    // generate array which contains only the indexes of tileIndexes which are walkable
    const walkables = tileIndexes
      .map(({ walkable }, i) => (walkable ? i : -1))
      .filter((i) => i !== -1);

    path.setAcceptableTiles(walkables);
    this.path = path;
  }

  findFreeSpot(isFree = true) {
    const { mapW, mapH } = this;
    let found = false;
    let x, y;
    while (!found) {
      x = math.rand(mapW);
      y = math.rand(mapH);
      const { frame } = this.tileAtMapPos({ x, y });
      if (!!frame.walkable == isFree) {
        found = true;
      }
    }
    return this.mapToPixelPos({ x, y });
  }
}

export default Level;
