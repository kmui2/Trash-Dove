class System {
    constructor(label, Block) {
        this.Block = Block;
        this.label = label;
        this.blocks = [];
        this.blocksTable = {};
        this.blockIndexes = [];
        this.blockSize = blockSize;
    }

    render() {
        for (var x in this.blocksTable) {
            if (this.blocksTable.hasOwnProperty(x)) {
                for (var y in this.blocksTable[x]) {
                    if (this.blocksTable[x].hasOwnProperty(y)) {
                        var block = this.blocksTable[x][y];
                        block.show();
                        if (block.isOffScreen()) {
                            block.removeFromWorld();
                            delete this.blocksTable[x][y];
                        }
                    }
                }
            }
        }
    }

    // only add block if no block exists
    add(x, y) {
        if (!(x in worldLabels)) {
            worldLabels[x] = {}
        } else if (worldLabels[x][y] == this.label) {
            return;
        }
        if (!(x in this.blocksTable)) {
            this.blocksTable[x] = {};
        }

        worldLabels[x][y] = this.label;
        var newBlock = new this.Block(x, y, this.blockSize);
        this.blocks.push(newBlock);
        this.blocksTable[x][y] = newBlock;


        this.blockIndexes.push([x, y]);
    }

    remove(x, y) {
        if (x in worldLabels && y in worldLabels[x] && worldLabels[x][y] == this.label) {
            worldLabels[x][y] = "free";
            this.blocksTable[x][y].removeFromWorld();
            delete this.blocksTable[x][y];
        }
    }
    
    clear() {
        this.blocks = [];
        this.blocksTable = {};
        this.blockIndexes = [];
        
    }

}