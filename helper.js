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

function initWorld(world) {

    var fileObj = world || currWorld;

    // adds instructions
    instructions = createElement('h3', 'Use mouse to move and click to jump. Press Space to switch to edit mode and click to add bricks. Hold CTRL to remove bricks.');
    instructions.position(width - 700, height - 20);

    // Win if touched flag
    Events.on(engine, 'collisionStart', victory);

    //initializes boundary
    enclosed = new Enclosed();

    //set timing parameters
    time = 0;
    delay = 10;
    timePressed = -delay;

    // initializes sprite
    sprite = new Sprite();
    sprite.isStatic(true);
    spriteControls = new MouseControls(sprite);

    // adds controls
    //        spriteControls = new ArrowControls(sprite);
    editControls = new EditControls();
    controls = editControls;

    // labels world indexes
    worldLabels = {};

    //create systems for various objects
    brickSystem = new System('brick', Brick);
    flagSystem = new System('flag', Flag);
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


function gotData(data) {
    console.log(data);
    var worlds = data.val();
    console.log(data.val());
    var keys = Object.keys(worlds);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        console.log(k);
        var name = worlds[k].name;
        var indexes = worlds[k].indexes;
        //            console.log(name, indexes);
        var li = createElement('li', name);
        li.parent('worldslist');
    }
}

function errData(err) {
    console.log('Error!');
    console.log(err);
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