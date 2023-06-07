// Your logic here

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Foot } from "./collisionDetection.js";
import { movements } from "./movements.js";
import { enemyFoot } from "./enemy.js";

const alabaster = new THREE.Color("#EFD28D");
const khaki = new THREE.Color("#0AF7FF");
const red = new THREE.Color("#A30000");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 2, 10);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const canvas = document.querySelector(".canvas");
canvas.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 1;
light.position.y = 5;
light.castShadow = true;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const cube = new Foot({
  height: 1,
  width: 1,
  depth: 1,
  velocity: { x: 0, y: -0.01, z: 0 },
  color: alabaster,
});
cube.castShadow = true;
scene.add(cube);

const ground = new Foot({
  height: 0.5,
  width: 10,
  depth: 55,
  color: khaki,
  position: {
    x: 0,
    y: -2,
    z: 0,
  },
});
ground.receiveShadow = true;
scene.add(ground);

camera.position.z = 5;

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

movements(keys, cube, ".music");

let score = 0;
let hscore = 0;
const enemies = [];
let spawnRate = 100;

const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");

easy.addEventListener("click", () => {
  spawnRate = 100;
});

medium.addEventListener("click", () => {
  spawnRate = 75;
});

hard.addEventListener("click", () => {
  spawnRate = 50;
});

function animate() {
  const footID = requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.update(ground);
  enemyFoot({
    enemies: enemies,
    ground: ground,
    cube: cube,
    id: footID,
  });

  if (score % spawnRate === 0) {
    if (spawnRate > 20) spawnRate -= 20;

    const enemy = new Foot({
      height: 1,
      width: 1,
      depth: 1,
      position: { x: (Math.random() - 0.5) * 10, y: 0, z: -15 },
      velocity: { x: 0, y: 0, z: 0.004 },
      color: red,
      zAcc: true,
    });
    enemy.castShadow = true;
    scene.add(enemy);

    enemies.push(enemy);
  }

  cube.velocity.x = 0;
  cube.velocity.z = 0;

  score++;

  const lastHighScore = parseFloat(localStorage.hscore);
  const scoreString = score;

  if (isNaN(lastHighScore) || score > lastHighScore) {
    document.querySelector(
      ".high-score"
    ).innerHTML = `High-score: ${scoreString}`;
    localStorage.hscore = scoreString;
  } else {
    document.querySelector(
      ".high-score"
    ).innerHTML = `High-score: ${localStorage.hscore}`;
  }

  document.querySelector(".score").innerHTML = `Score: ${score}`;

  if (keys.a.pressed) {
    cube.velocity.x = -0.05;
  }
  if (keys.d.pressed) {
    cube.velocity.x = +0.05;
  }
  if (keys.w.pressed) {
    cube.velocity.z = -0.05;
  }
  if (keys.s.pressed) {
    cube.velocity.z = +0.05;
  }
}

const ded = document.querySelector(".ded");

ded.addEventListener("click", () => {
  location.reload();
});

localStorage.removeItem("score");

const start = document.querySelector(".start-game");
const menu = document.querySelector(".game-menu");

const startGame = () => {
  menu.classList.add("game-hide");
  animate();
};

start.addEventListener("click", startGame);
