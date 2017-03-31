// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Events = Matter.Events;
var engine;
var time;
var delay;
var timePressed;
//CONTROLS
var controls;
//CIRCLES
var CircleSystem;
var enclosed;
//BRICKS
var brickSystem;
var brick_0_img;
//FLAGS
var flagSystem;
var flag_0_img;
//SPRITE
var sprite;
var left_0;
var right_0;
//BACKGROUND
var background_img;
//WORLD SAVE
var input, button, prompt;
//WORLD
var initWorld;
var worldSave;
var worldLabels;
var blockSize = 30;
var loaded_indexes;

//var listener;

function preload() {
    loaded_indexes = loadJSON("block_indexes.json");
    brick_0_img = loadImage("images/brick_0.png");
    left_0_img = loadImage("images/left_0.png");
    right_0_img = loadImage("images/right_0.png");
    background_img = loadImage("images/background.png");
    flag_0_img = loadImage("images/flag_0.png")
}

function setup() {
    time = 0;
    createCanvas(1000, 700);
    engine = Engine.create();
    world = engine.world;
//    initWorld = engine.world;
//    world = initWorld.copy();
    Engine.run(engine);
    enclosed = new Enclosed();
    //    circleSystem = new CircleSystem(10, 50);
    frameRate(30);
    sprite = new Sprite(loaded_indexes.spriteIndex[0],loaded_indexes.spriteIndex[1]);
    sprite.body.isStatic = true;

    spriteControls = new MouseControls(sprite);
    //    spriteControls = new ArrowControls(sprite);
    editControls = new EditControls();
    controls = editControls;

    delay = 10;
    timePressed = -delay;

    worldLabels = {};
    brickSystem = new BrickSystem();
    flagSystem = new FlagSystem();


    input = createInput();
    input.position(20, height + 40);
    button = createButton('save world');
    button.position(input.x + input.width, height + 40);
    button.mousePressed(saveWorld);
    
    clearButton = createButton('clear world');
    clearButton.position(width - 300, height + 40);
    clearButton.mousePressed(setup);

    prompt = createElement('h2', 'Enter Name to Save World');
    prompt.position(20, height - 20);
    
    instructions = createElement('h3', 'Use mouse to move and click to jump. Press Space to switch to edit mode and click to add bricks. Hold CTRL to remove bricks.');
    instructions.position(width -700, height - 20);

    // Win if touched flag
    Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;
            for (var i = 0, j = pairs.length; i != j; ++i) {
                var pair = pairs[i];
        
                if (pair.bodyB.isSensor) {
                    alert("You Win!")
                }
            }
    });
    
    if ("brickIndexes" in loaded_indexes) {
    for (var i = 0; i < loaded_indexes.brickIndexes.length; i++) {
        
    }
        for (var index of loaded_indexes.brickIndexes) {
            brickSystem.addBrick(index[0],index[1]);
        }
    }
    if ("flagIndexes" in loaded_indexes) {
        for (var index of loaded_indexes.flagIndexes) {
            flagSystem.addFlag(index[0],index[1]);
        }
    }
}


function draw() {
    background(background_img);

    //switch sprite and edit controls using space
    if (keyIsPressed) {
        if (keyCode === 32 && timePressed + delay < time) {
            if (controls === spriteControls) {
                controls = editControls;
                sprite.body.isStatic = true;
            } else {
                controls = spriteControls;
                sprite.body.isStatic = false;
            }
            timePressed = time;
        }
    }
    controls.runControls();
    fill(0, 102, 153);
    brickSystem.render();
    flagSystem.render();
    sprite.render();
    Engine.update(engine);
    enclosed.show();

    if (controls === editControls) {
        for (var i = 0; i < coordToIndexX(width); i++) {
            line(indexToCoordX(i), 0, indexToCoordX(i), height);
            fill(255);
        }

        for (var i = 0; i < coordToIndexY(height); i++) {
            line(0, indexToCoordY(i), width, indexToCoordY(i));
        }
    }
    textSize(32);
    text("(" + floor((mouseX / brickSystem.brickSize) + 0.5) + ", " + floor(((height - mouseY) / brickSystem.brickSize) + 0.5) + ")", 100, 100);
    //    circleSystem.render();


    time++;
}

function saveWorld() {
    var name = input.value();
    prompt.html('Saved ' + name + '.json');
    input.value('');
    
    var json = {
            "brickIndexes": brickSystem.brickIndexes,
            "flagIndexes": flagSystem.flagIndexes
    };

    saveJSON(json, name + ".json", true);
}


function coordToIndexX(x) {
    return floor((x / blockSize) + 0.5);
}

function coordToIndexY(y) {
    return floor(((y) / blockSize) + 0.5);
}

function indexToCoordX(x) {
    return (x - 0.5) * blockSize;
}

function indexToCoordY(y) {
    return height - ((y - 0.5) * blockSize);
}