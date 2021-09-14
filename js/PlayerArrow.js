class PlayerArrow {
  constructor(x, y, width, height, archerAngle) {
    var options = {
      isStatic: true,
      density: 0.1
    };
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    this.image = loadImage("./assets/arrow.png");
    this.trajectory = [];
    this.isRemoved = false;
    this.archerAngle = archerAngle;
    this.velocity = p5.Vector.fromAngle(archerAngle);
    World.add(world, this.body);
  }

  remove(index) {
    this.isRemoved = true;
    Matter.World.remove(world, this.body);
    delete playerArrows[index];
  }

  shoot(archerAngle) {
    archerAngle += 90;
    this.velocity = p5.Vector.fromAngle(archerAngle * (3.14 / 180));

    this.velocity.mult(0.5);

    Matter.Body.setVelocity(this.body, {
      x: this.velocity.x * (180 / 3.14),
      y: this.velocity.y * (180 / 3.14)
    });

    Matter.Body.setStatic(this.body, false);
  }

  display() {
    if (!this.isRemoved) {
    var tmpAngle;
    if (this.body.velocity.y === 0) {
      tmpAngle = this.archerAngle + 90;
    } else {
      tmpAngle =
        Math.atan(this.body.velocity.y / this.body.velocity.x) * (180 / 3.14);
    }

    Matter.Body.setAngle(this.body, tmpAngle);

    var pos = this.body.position;
    var angle = this.body.angle;

    var b1collision = Matter.SAT.collides(this.body, board1.body).collided
    var b2collision = Matter.SAT.collides(this.body, board2.body).collided

    if (b1collision) {
      print('Board 1 was hit!') // I discovered that print() also works
      this.remove()
    }
    if (b2collision) {
      print('Board 2 was hit!')
      this.remove()
    }

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();


    //optional code to add trajectory to the arrow
    
    // if (this.body.velocity.x > 0 && this.body.position.x > 400) {
    //   var position = [this.body.position.x, this.body.position.y];
    //   this.trajectory.push(position);
    // }

    // for (var i = 0; i < this.trajectory.length; i++) {
    //   fill("white");
    //   ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    // }
  }
  }
}
