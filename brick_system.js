class BrickSystem {
    constructor() {
        this.bricks = [];
        this.bricksTable = {};
        this.brickIndexes = [];
        this.brickSize = 30;

        //adds index coords
//        for (var i = 0; i < coordToIndexX(width); i++) {
//            this.addBrick(i, 2);
//        }

    }

    render() {
        //        for (var i = 0; i < this.bricks.length; i++) {
        //            this.bricks[i].show();
        //            if (this.bricks[i].isOffScreen()) {
        //                this.bricks[i].removeFromWorld();
        //                this.bricks.splice(i, 1);
        //                i--;
        //            }
        //        }
        for (var x in this.bricksTable) {
            if (this.bricksTable.hasOwnProperty(x)) {
                for (var y in this.bricksTable[x]) {
                    if (this.bricksTable[x].hasOwnProperty(y)) {
                        var brick = this.bricksTable[x][y];
                        brick.show();
                        if (brick.isOffScreen()) {
                            brick.removeFromWorld();
                            delete this.bricksTable[x][y];
                        }
                    }
                }
            }
        }
    }

    // only add brick if no brick exists
    addBrick(x, y) {
        var indexX = x;
        var indexY = y;
        if (!(indexX in worldLabels)) {
            worldLabels[indexX] = {}
        } else if (worldLabels[indexX][indexY] == 'brick') {
            return;
        }
        if (!(indexX in this.bricksTable)) {
            this.bricksTable[indexX] = {};
        }


        worldLabels[indexX][indexY] = 'brick';
        var newBrick = new Brick(indexX, indexY, this.brickSize);
        this.bricks.push(newBrick);
        this.bricksTable[indexX][indexY] = newBrick;


        this.brickIndexes.push([indexX, indexY]);

    }

    removeBrick(x, y) {
        if (x in worldLabels && y in worldLabels[x] && worldLabels[x][y] == 'brick') {
            worldLabels[x][y] = "free";
            this.bricksTable[x][y].removeFromWorld();
            delete this.bricksTable[x][y];
        }
    }
    
    clear() {
        this.bricks = [];
        this.bricksTable = {};
        this.brickIndexes = [];
        
    }

}
//class BrickSystem {
//    constructor() {
//        this.bricks = [];
//        this.bricksTable = {};
//        this.brickIndexes = [];
//        this.brickSize = 30;
//        this.json = {
//            "brickIndexes": this.brickIndexes,
//        };
//
//        //adds index coords
//        for (var i = 0; i < coordToIndexX(width); i++) {
//            this.addBrick(indexToCoordX(i), indexToCoordY(2));
//        }
//
//    }
//
//    render() {
//        for (var i = 0; i < this.bricks.length; i++) {
//            this.bricks[i].show();
//            if (this.bricks[i].isOffScreen()) {
//                this.bricks[i].removeFromWorld();
//                this.bricks.splice(i, 1);
//                i--;
//            }
//        }
//    }
//    
//    // only add brick if no brick exists
//    addBrick(x, y) {
//        var indexX = floor((x / this.brickSize) + 0.5);
//        var indexY = floor(((height - y) / this.brickSize) + 0.5);
//        if (!(indexX in worldLabels)) {
//            worldLabels[indexX] = {}
//        }
//        else if (worldLabels[indexX][indexY] == 'brick') {
//            return;
//        }
//        if (!(indexX in this.bricksTable)) {
//            this.bricksTable[indexX] = {};
//        }
//        
//        
//        worldLabels[indexX][indexY] = 'brick';
//        var newBrick = new Brick(indexX, indexY, this.brickSize);
//        this.bricks.push(newBrick);
//        this.bricksTable[indexX][indexY] = newBrick;
//        
//        
//        this.brickIndexes.push([indexX,indexY]);
//        this.json = {
//            "brickIndexes": this.brickIndexes,
//        };
//    }
//    
//    removeBrick(x, y) {
//        if (x in worldLabels && y in worldLabels[x] && worldLabels[x][y] == 'brick') {
//            
//        }
//    }
//    
//}