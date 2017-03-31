class Flag extends Rectangle{
    constructor(indexX, indexY, size) {
        var coordX = indexX*size;
        var coordY = height - indexY*size;
        var options = {
            friction: 0,
            restitution: 0,
            isStatic: true,
            isSensor: true,
        }
        super(coordX, coordY, size, size, options);
    }
    
     show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        strokeWeight(0.1);
        stroke(255);
        fill(127);
        image(flag_0_img, 0, 0, this.w, this.h);
        pop();
    }
}