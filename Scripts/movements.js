export function movements(keys, cube, jump) {
  const music = document.querySelector(jump);

  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyA":
        keys.a.pressed = true;
        break;

      case "KeyD":
        keys.d.pressed = true;
        break;

      case "KeyW":
        keys.w.pressed = true;
        break;

      case "KeyS":
        keys.s.pressed = true;
        break;

      case "Space":
        cube.velocity.y = 0.14;
        music.play();
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyA":
        keys.a.pressed = false;
        break;

      case "KeyD":
        keys.d.pressed = false;
        break;

      case "KeyW":
        keys.w.pressed = false;
        break;

      case "KeyS":
        keys.s.pressed = false;
        break;
    }
  });
}
