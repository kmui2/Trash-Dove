class Controls{
    constructor() {
        this.delay = 5;
        this.timePressed = -this.delay;
    }
    runControls () {
        if (mouseIsPressed && this.timePressed + this.delay < time) {
//            console.log("(" + mouseX + "," + mouseY + ")");
            this.timePressed = time;
            blockSystem.addBlock(mouseX,mouseY);
        }
    }
    
}