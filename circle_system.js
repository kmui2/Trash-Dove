function CircleSystem(x, y) {
    this.circles = [];
    this.x = x || 200;
    this.y = y || 50;


    this.render = function () {

        this.circles.push(new Circle(this.x, this.y, random(5, 10)));
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].show();
            if (this.circles[i].isOffScreen()) {
                this.circles[i].removeFromWorld();
                this.circles.splice(i, 1);
                i--;
            }
        }
    }
}