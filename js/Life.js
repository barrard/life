function Life({ ctx, w, h }) {
    this.ctx = ctx;
    this.particles = [];
    this.group = {};
    this.w = w;
    this.h = h;
    //make some particles
    console.log("Life has its ways");

    return this;
}

Life.prototype.rule = function (group1, group2, g) {
    if (!group1 || !group2) return;
    for (let i = 0; i < group1.length; i++) {
        let fx = 0;
        let fy = 0;
        for (let j = 0; j < group2.length; j++) {
            this.a = group1[i];
            this.b = group2[j];

            this.dx = this.a.x - this.b.x;
            this.dy = this.a.y - this.b.y;

            this.d = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

            //with localization
            if (this.d > 0 && this.d < 80) {
                this.F = g * (1 / this.d);
                fx += this.F * this.dx;
                fy += this.F * this.dy;
            }
        }

        this.a.vx = (this.a.vx + fx) * 0.5;
        this.a.vy = (this.a.vy + fy) * 0.5;
        this.a.x += this.a.vx;
        this.a.y += this.a.vy;
        if (this.a.x <= 0 || this.a.x >= this.w) {
            this.a.vx *= -1;
        }
        if (this.a.y <= 0 || this.a.y >= this.h) {
            this.a.vy *= -1;
        }
    }
};

Life.prototype.draw = function (x, y, c, s1, s2) {
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, s1, s2 || s1);
};

Life.prototype.particle = (x, y, c) => {
    // return new Particle(x, y, c, s)
    return { x, y, vx: 0, vy: 0, color: c };
};

Life.prototype.random = function (wh) {
    if (wh === "x") {
        return Math.random() * this.w - 50;
    } else if (wh === "y") {
        return Math.random() * this.h - 50;
    }
};

Life.prototype.create = function (n, c, name) {
    name = name || c;
    if (!this.group[name]) {
        this.group[name] = [];
    }
    for (let i = 0; i < n; i++) {
        this.group[name].push(
            this.particle(this.random("x"), this.random("y"), c)
        );
        this.particles.push(this.group[name][i]);
    }

    return this.group[name];
};

Life.prototype.update = function (rules) {
    rules.forEach((rule) => {
        const { g1, g2, g } = rule;
        this.rule(this.group[g1], this.group[g2], g);
    });
    // this.rule(group1, group2, attraction);
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.draw(0, 0, "black", this.w, this.h);
    for (i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        this.draw(p.x, p.y, p.color, 5);
    }

    requestAnimationFrame(() => {
        this.update(rules);
    });
};
