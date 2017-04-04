
class MouseControls {
    constructor(sprite, speed, maxSpeed) {
        this.delay = 10 ;
        this.timeUpPressed = -this.delay;
        this.speed = speed || 0.001;
        this.maxSpeed = maxSpeed || 5;
    }
    runControls() {
        //right
        if (mouseX > sprite.body.position.x && sprite.body.velocity.x < this.maxSpeed && abs(sprite.body.position.x - mouseX) > 10) {
            //immediately stop and turn
            if (sprite.body.velocity.x < 0)
                Body.setVelocity(sprite.body, createVector(0, sprite.body.velocity.y))
            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y+50), createVector(this.speed, 0));
        }
        //left
        else if (mouseX < sprite.body.position.x && sprite.body.velocity.x > -this.maxSpeed && abs(sprite.body.position.x - mouseX) > 10) {
            //immediately stop and turn
            if (sprite.body.velocity.x > 0)
                Body.setVelocity(sprite.body, createVector(0, sprite.body.velocity.y))
            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y+50), createVector(-this.speed, 0));
        }
        else {
            Body.setVelocity(sprite.body, createVector(0,sprite.body.velocity.y));
        }
        //jump
        if (mouseIsPressed && this.timeUpPressed + this.delay < time) {
            this.timeUpPressed = time;
            Body.setVelocity(sprite.body, createVector(sprite.body.velocity.x, -10));
        }
         //switch sprite and edit controls using space
    if (keyIsPressed) {
        if (keyCode === 32 && timePressed + delay < time) {
            if (controls === spriteControls) {
                controls = editControls;
                sprite.isStatic(true);
            } else {
                controls = spriteControls;
                sprite.isStatic(false);
            }
            timePressed = time;
        }
    }
    }
}