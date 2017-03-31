class EditControls {
    constructor() {
        this.delay = 1;
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
                brickSystem.removeBrick(floor((mouseX / blockSize) + 0.5), floor(((height - mouseY) / blockSize) + 0.5));
            } else {
                brickSystem.addBrick(floor((mouseX / blockSize) + 0.5), floor(((height - mouseY) / blockSize) + 0.5));
            }
        }
    }
}