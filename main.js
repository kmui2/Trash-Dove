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
var worldName;
var initWorld;
var worldSave;
var worldLoad;
var worldLabels;
var blockSize = 30;
var loaded_indexes;
var worlds;
var ref;
var database;
var currWorld;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDb5Rk2-5YjfdsROZIEi8xI1HDu26OACwo",
    authDomain: "trash-dove-worlds.firebaseapp.com",
    databaseURL: "https://trash-dove-worlds.firebaseio.com",
    projectId: "trash-dove-worlds",
    storageBucket: "trash-dove-worlds.appspot.com",
    messagingSenderId: "804214238414"
};


//var listener;

function preload() {
    loaded_indexes = loadJSON("block_indexes.json");
    worlds = loadJSON("worlds.json");
    brick_0_img = loadImage("images/brick_0.png");
    left_0_img = loadImage("images/left_0.png");
    right_0_img = loadImage("images/right_0.png");
    background_img = loadImage("images/background.png");
    flag_0_img = loadImage("images/flag_0.png")
}

function setup() {
    // creates Canvas
    createCanvas(1000, 700);
    
    firebase.initializeApp(config);
    console.log(firebase);

    database = firebase.database();
    ref = database.ref('trash-dove-worlds');

    ref.on('value', gotData, errData);

    //create engine and world
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    // adds save world option and instructions
    input = createInput();
    input.position(20, height + 40);
    button = createButton('save world');
    button.position(input.x + input.width, height + 40);
    button.mousePressed(saveWorld);
    prompt = createElement('h2', 'Enter Name to Save World');
    prompt.position(20, height - 20);
    
    //read JSON and initialize world
    currWorld = worlds.default;
    initWorld(currWorld);
    
    // adds clear world option
    clearButton = createButton('clear world');
    clearButton.position(width - 300, height + 40);
    clearButton.mousePressed(initWorld);

}


function draw() {
    background(background_img);

    controls.runControls();
    fill(0, 102, 153);
    brickSystem.render();
    flagSystem.render();
    sprite.render();
    Engine.update(engine);
    //    enclosed.show();

    if (controls === editControls) {
        displayGrid();
    }
    displayIndexes();
    time++;

    // debug
    noLoop();
}


//function keyPressed() {
//    if (controls === spriteControls) {
//        //right
//        if (keyCode === RIGHT_ARROW) {
//            //immediately stop and turn
//            if (sprite.body.velocity.x < 0)
//                Body.setVelocity(sprite.body, createVector(0, sprite.body.velocity.y))
//            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y+100), createVector(this.speed, 0));
//        }
//        //left
//        if (keyCode === LEFT_ARROW) {
//            //immediately stop and turn
//            if (sprite.body.velocity.x > 0)
//                Body.setVelocity(sprite.body, createVector(0, sprite.body.velocity.y))
//            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y+100), createVector(-this.speed, 0));
//        }
//        //jump
//        if (keyCode == UP_ARROW && this.timeUpPressed + this.delay < time) {
////            Body.setVelocity(sprite.body, createVector(sprite.body.velocity.x, -1));
//            this.timeUpPressed = time;
//            
//            Body.applyForce(sprite.body, createVector(sprite.body.position.x,sprite.body.position.y), createVector(0,-0.01));
//        }
//    }
//}