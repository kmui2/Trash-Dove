class EditControls {
    constructor() {
        this.delay = 0;
        this.timePressed = -this.delay;
    }
    runControls() {
        if (mouseIsPressed && this.timePressed + this.delay < time) {
            //            console.log("(" + mouseX + "," + mouseY + ")");
            this.timePressed = time;
            //            if (worldLabels[coordToIndexX(mouseX)][coordToIndexY(mouseY)] != 'flag')
            //                flagSystem.addFlag(mouseX, mouseY);
            //            if (worldLabels[coordToIndexX(mouseX)][coordToIndexY(mouseY)] != 'brick')     
            if (keyIsDown(17)) {
                brickSystem.remove(floor((mouseX / blockSize) + 0.5), floor(((height - mouseY) / blockSize) + 0.5));
            } else {
                brickSystem.add(floor((mouseX / blockSize) + 0.5), floor(((height - mouseY) / blockSize) + 0.5));
            }
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