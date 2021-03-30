import pop from "../pop/index.js";
const { Game, entity, KeyControls, math } = pop;
import Mouse from "./entities/Mouse.js";
import Cheese from "./entities/Cheese.js";
import Container from "../pop/Container.js";

const game = new Game(640, 320);
const { scene, w, h } = game;

const relocate = (e) => {
  const { pos } = e;
  pos.x = math.rand(w - 50);
  pos.y = math.rand(h - 50);
};

const mouse = scene.add(new Mouse(new KeyControls()));
relocate(mouse);
entity.addDebug(mouse);

const cheeses = new Container();

for (let i = 0; i < 5; i++) {
  const cheese = new Cheese();
  relocate(cheese);
  entity.addDebug(cheese);
  cheeses.add(cheese);
}

scene.add(cheeses);

game.run(() => {
  entity.hits(mouse, cheeses, (cheese) => {
    relocate(cheese);
  });
});
