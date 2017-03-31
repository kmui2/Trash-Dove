
class ArrowControls {
    constructor(sprite, speed, maxSpeed) {
        this.delay = 100;
        this.timeUpPressed = -this.delay;
        this.speed = speed || 0.001;
        this.maxSpeed = maxSpeed || 1;
    }
    runControls() {
        //right
        if (keyCode === RIGHT_ARROW) {
            //immediately stop and turn
            if (sprite.body.velocity.x < 0)
                Body.setVelocity(sprite.body, createVector(0, sprite.body.velocity.y))
            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y+100), createVector(this.speed, 0));
        }
        //left
        if (keyCode === LEFT_ARROW) {
            //immediately stop and turn
            if (sprite.body.velocity.x > 0)
                Body.setVelocity(sprite.body, createVector(0, sprite.body.velocity.y))
            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y+100), createVector(-this.speed, 0));
        }
        //jump
        if (keyCode == UP_ARROW && this.timeUpPressed + this.delay < time) {
//            Body.setVelocity(sprite.body, createVector(sprite.body.velocity.x, -1));
            this.timeUpPressed = time;
            
            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y), createVector(0,-0.01));
        }
    }
}