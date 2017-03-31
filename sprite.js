// extend Circle
class Sprite extends Rectangle{
    //Person.call(this, first, last, age, gender, interests);
    constructor(x, y) {
        
        var options = {
            friction: 0,
            restitution: 0,
            isStatic: false,
        }
        super(indexToCoordX(x)-30/2, indexToCoordY(y)-30/2, 30, 50,options);
//        this.rectX = x || 150;
//        this.rectY = y || 50;
//        this.rectangle = new Rectangle(this.rectX, this.rectY, 10, 50);
    }
    render() {
        Body.setAngle(this.body, 0);
//        Body.applyForce(this.body, createVector(this.body.position.x,this.body.position.y),createVector(0,-0.005));
//        this.rectangle.show();
        this.show();
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
        if (this.body.velocity.x < 0)
            image(left_0_img, 0, 0, this.w, this.h);
        else
            image(right_0_img, 0, 0, this.w, this.h);
            
        pop();
    }
}