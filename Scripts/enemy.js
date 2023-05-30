import { boxCollision } from "./collisionDetection.js";
import { Foot } from "./collisionDetection.js";
const game = document.querySelector(".gameover");
const diff = document.querySelector(".dropdown");
const title = document.querySelector(".title");
const move = document.querySelector(".wasd");
const space = document.querySelector(".space");
const score = document.querySelector(".score");

export function enemyFoot({ enemies, ground, cube, id }) {
  enemies.forEach((enemy) => {
    enemy.update(ground);

    if (
      boxCollision({
        box1: cube,
        box2: enemy,
      })
    ) {
      cancelAnimationFrame(id);
      game.classList.add("open");
      diff.classList.add("foot");
      title.classList.add("foot");
      space.classList.add("foot");
      move.classList.add("foot");
      score.classList.add(".feet");
    }
  });

  if (cube.position.y <= -15) {
    cancelAnimationFrame(id);
    game.classList.add("open");
    diff.classList.add("foot");
    title.classList.add("foot");
    space.classList.add("foot");
    move.classList.add("foot");
    score.classList.add(".feet");
  }
}
