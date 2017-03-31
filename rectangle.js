class Rectangle {

    constructor(x, y, w, h, options) {
//        this.body = Bodies.rectangle(x, y, w + 5, h, options);
        this.body = Bodies.rectangle(x, y, w, h , options);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    isOffScreen() {
        var pos = this.body.position;
        return (pos.y > height + 100);
    }

    removeFromWorld() {
        World.remove(world, this.body);
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
//        imageMode(CENTER);
        strokeWeight(0.1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);
        //        image(brick_0_img, 0, 0, this.w, this.h);
        pop();
    }

}