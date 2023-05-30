import * as THREE from "three";

export class Foot extends THREE.Mesh {
  constructor({
    height,
    width,
    depth,
    color,
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
    zAcc = false,
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({
        color: color,
      })
    );

    this.height = height;
    this.width = width;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);
    this.velocity = velocity;

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.left = this.position.x - this.width / 2;
    this.right = this.position.x + this.width / 2;
    this.front = this.position.z - this.depth / 2;
    this.back = this.position.z + this.depth / 2;

    this.gravity = -0.006;
    this.zAcc = zAcc;
  }

  update(ground) {
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.left = this.position.x - this.width / 2;
    this.right = this.position.x + this.width / 2;
    this.front = this.position.z - this.depth / 2;
    this.back = this.position.z + this.depth / 2;

    if (this.zAcc) this.velocity.z += 0.005;

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.levitating(ground);
  }

  levitating(ground) {
    this.velocity.y += this.gravity;

    if (
      boxCollision({
        box1: this,
        box2: ground,
      })
    ) {
      const friction = 0.5;
      this.velocity.y *= friction;
      this.velocity.y = -this.velocity.y;
    } else {
      this.position.y += this.velocity.y;
    }
  }
}

export function boxCollision({ box1, box2 }) {
  const zCollision = box1.front <= box2.back && box1.back >= box2.front;
  const xCollision = box1.right >= box2.left && box1.left <= box2.right;
  const yCollision =
    box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;

  return zCollision && xCollision && yCollision;
}
