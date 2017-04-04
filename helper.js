function coordToIndexX(x) {
    return floor((x / blockSize) + 0.5);
}

function coordToIndexY(y) {
    return floor(((y) / blockSize) + 0.5);
}

function indexToCoordX(x) {
    return (x) * blockSize;
}

function indexToCoordY(y) {
    return height - ((y) * blockSize);
}

function saveWorld() {
    var name = input.value();
    prompt.html('Saved ' + name + '.json');
    input.value('');
    
    // TODO
    var brickIndexes = [];
    var flagIndexes = [];

    var json = {
        "brickIndexes": brickSystem.blockIndexes,
        "flagIndexes": flagSystem.blockIndexes,
        "spriteIndex": [sprite.x,sprite.y]
    };

    saveJSON(json, name + ".json", true);
}

function victory(event) {

    var pairs = event.pairs;
    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyB.isSensor) {
            alert("You Win!")
        }
    }
}

function initWorld(fileObj) {
    
    if ("spriteIndex" in fileObj) {
        sprite.setPosition(fileObj.spriteIndex[0], fileObj.spriteIndex[1]);
    }
    
    if ("brickIndexes" in fileObj) {
    for (var i = 0; i < fileObj.brickIndexes.length; i++) {
        
    }
        for (var index of fileObj.brickIndexes) {
            brickSystem.add(index[0],index[1]);
        }
    }
    if ("flagIndexes" in loaded_indexes) {
        for (var index of fileObj.flagIndexes) {
            flagSystem.add(index[0],index[1]);
        }
    }
}

function displayGrid() {
    for (var i = 0; i < coordToIndexX(width); i++) {
            line(indexToCoordX(i)-blockSize/2, 0, indexToCoordX(i)-blockSize/2, height);
            fill(255);
        }

        for (var i = 0; i < coordToIndexY(height); i++) {
            line(0, indexToCoordY(i)-blockSize/2, width, indexToCoordY(i)-blockSize/2);
        }
}

function displayIndexes() {
    push();
    textSize(32);
    text("(" + floor((mouseX / blockSize) + 0.5) + ", " + floor(((height - mouseY) / blockSize) + 0.5) + ")", 100, 100);
    pop();
}