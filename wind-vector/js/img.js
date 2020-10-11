class Img {
   constructor(i, x, y, history) {
      this.i = i;
      this.w = 600;
      this.h = 400;
      this.wr = this.w / 2;
      this.hr = this.h / 2;
      this.pos = createVector(x, y); //middle of canvas
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0); // sped of object
      // this.acc.setMag(0.01); // magnitude is distance to travel per frame
      this.history = history
   }

   applyForce(force) {
      // objects accelration is the sum all forces applied to it
      this.acc.add(force) // maybe add wind to overall velosity of object?
   }

   applyMouseAcceleration() {
      let mouse = createVector(mouseX, mouseY);
      let distance = p5.Vector.sub(mouse, this.pos); // subtract the vectors
      this.acc.add(distance);
      this.acc.setMag(0.1);
   }

   update() {
   
      this.vel.add(this.acc);
      this.vel.limit(5); // don't let velocity increase by num;

      this.pos.add(this.vel);

      this.acc.set(0, 0) // reset acc every draw cycle
      let v = createVector(this.pos.x, this.pos.y);
      this.history.push(v);

      if (this.history.length > 20) {
         this.history.splice(0, 1);
      }
   }

   edges() {
      // set the acceleration to be the distance between object position and mouse position
      if (this.pos.y >= height + this.hr) {
         this.pos.y = height + this.hr;
         this.vel.y *= -1;
      } else if (this.pos.y <= this.hr) {
         this.pos.y = this.hr;
         this.vel.y *= -1
      }

      if (this.pos.x >= width - this.wr) {
         this.pos.x = width - this.wr;
         this.vel.x *= -1
      } else if (this.pos.x <= this.wr) {
         this.pos.x = this.wr;
         this.vel.x *= -1
      }

   }

   show() {
      image(this.i, this.pos.x - this.wr, this.pos.y - this.hr, this.w, this.h);

      for (let i = 0; i < this.history.length; i++) {
         image(this.i, this.history[i].x - this.wr, this.history[i].y - this.hr, this.w, this.h);
      }
   }
}