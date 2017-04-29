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
        "name": name,
        indexes: {
            "brickIndexes": brickSystem.blockIndexes,
            "flagIndexes": flagSystem.blockIndexes,
            "spriteIndex": [sprite.x, sprite.y]
        }
    };

    //    saveJSON(json, name + ".json", true);
    ref.push(json)
}

function loadWorld() {

    worldLoad = document.getElementById("myFile");
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

    worldName = fileObj.name;

    if ("spriteIndex" in fileObj.indexes) {
        sprite.setPosition(fileObj.indexes.spriteIndex[0], fileObj.indexes.spriteIndex[1]);
    }

    if ("brickIndexes" in fileObj.indexes) {
        for (var index of fileObj.indexes.brickIndexes) {
            brickSystem.add(index[0], index[1]);
        }
    }
    if ("flagIndexes" in fileObj.indexes) {
        for (var index of fileObj.indexes.flagIndexes) {
            flagSystem.add(index[0], index[1]);
        }
    }
}

function displayGrid() {
    for (var i = 0; i < coordToIndexX(width); i++) {
        line(indexToCoordX(i) - blockSize / 2, 0, indexToCoordX(i) - blockSize / 2, height);
        fill(255);
    }

    for (var i = 0; i < coordToIndexY(height); i++) {
        line(0, indexToCoordY(i) - blockSize / 2, width, indexToCoordY(i) - blockSize / 2);
    }
}

function displayIndexes() {
    push();
    textSize(32);
    text("(" + floor((mouseX / blockSize) + 0.5) + ", " + floor(((height - mouseY) / blockSize) + 0.5) + ")", 100, 100);
    pop();
}