class Enclosed {
    constructor() {
        this.boundaries = []
        this.boundaries.push(new Boundary(width / 2, height, width, 50, 0));
        this.boundaries.push(new Boundary(width / 2, 0, width, 50, 0));
        this.boundaries.push(new Boundary(0, height/2, 50, height, 0));
        this.boundaries.push(new Boundary(width, height/2, 50, height, 0));
    }
    
    show() {
        for (var i = 0; i < this.boundaries.length; i++) {
            this.boundaries[i].show();
        }
    }
}