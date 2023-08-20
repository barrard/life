function Particle(x, y, c, s) {
  this.x = x;
  this.y = y;
  this.c = c;
  this.s = s;
  return this;
}

Particle.prototype.draw = () => {
  console.log("I like draw");
};
