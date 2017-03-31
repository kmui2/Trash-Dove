class FlagSystem {
    constructor() {
        this.flags = [];
        this.flagIndexes = [];
        this.flagSize = 30;
//    this.addFlag(indexToCoordX(10),indexToCoordY(3));
    }

    
    render() {
        for (var i = 0; i < this.flags.length; i++) {
            this.flags[i].show();
            if (this.flags[i].isOffScreen()) {
                this.flags[i].removeFromWorld();
                this.flags.splice(i, 1);
                i--;
            }
        }
    }


    // only add flag if no flag exists
    addFlag(x, y) {
//        var indexX = floor((x / this.flagSize) + 0.5);
//        var indexY = floor(((height - y) / this.flagSize) + 0.5);
        var indexX = x;
        var indexY= y;
        if (worldLabels[indexX] == null || worldLabels[indexX][indexY] == 'flag') {
            return;
        }
        worldLabels[indexX][indexY] = 'flag';
        this.flags.push(new Flag(indexX, indexY, this.flagSize));
        this.flagIndexes.push([indexX, indexY]);

    }
    
    clear() {
        this.flags = [];
        this.flagIndexes = [];
    }
}