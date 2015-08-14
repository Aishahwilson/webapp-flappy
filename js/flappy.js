// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 450;
var jumpPower = 200;
var gapSize = 100
var gapMargin = 50
var blockHeight = 50
var starHeight = 50

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = $("#fullName").val();
    var email = $("#email").val();
    var score = $ ("#score").val();
    var greeting_message = greeting + name + "<p>" + "(" + email + ")"
       + "</p>" + "<p>" + "Your score is:" + score + "</p>";
    $("#greeting-form").hide();
    $("#greeting").append("<p>" + greeting_message + "</p>");
    //event_details.preventDefault();
});
var score = 0;
var labelScore;
var player;
var pipes = [];
var pipeInterval;
var balloons = [];
var weights = [];
var started = false;
var background;
var splashDisplay;
//var stars = [];
//var pipeEndExtraWidth = 60
//var pipeEndHeight = 25

function preload() {
    game.load.image("playerImg", "../assets/httyd3");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("backgroundImg", "../assets/cavesez2.jpg");
    game.load.image("pipe","../assets/Stone_slab");
    game.load.image("balloon", "../assets/gold_coin");
    game.load.image("weight", "../assets/red_egg");
    //game.load.image("stars", "../assets/star.png")
    //game.load.image("pipend", "../assets/pipe-end.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#000000");
    game.add.text(250, 150, "Flappy Dragon!",
        {font: "50px Highway Gothic", fill: "#FF6600"});
    game.add.sprite(200, 157, "playerImg");
    game.add.sprite(560, 157, "playerImg");
    background = game.add.image(0, 0, "backgroundImg");
    background.width=790
    background.height=400
    /*game.input.onDown.add(clickHandler);
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    //alert(score);*/
    labelScore = game.add.text(20, 20, "0",
        {font: "50px Highway Gothic", fill: "#FF6600"});
    player = game.add.sprite(100, 200, "playerImg");
    player.width=50;
    player.height=45;
    player.anchor.setTo(0.5, 0.5);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    //for(var count=0; count<8; count++){
        //game.add.sprite(150, 50 * count, "pipe");
    //}
    //generatePipe();

   /* game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = -300;
    player.body.gravity.y = gameGravity;
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    pipeInterval = 1.80;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
       generate);*/
    game.input.keyboard
        .addKey(Phaser.Keyboard.ENTER)
        .onDown.add(start);
    splashDisplay = game.add.text(250, 150, "Press ENTER to start");
    //game.add.sprite = (addStar)


}
function clickHandler(event){
    //alert("The position is: " + event.x + "," + event.y);
    game.add.sprite(event.x, event.y, "playerImg")
}
function spaceHandler(){
    game.sound.play("score")
}
function changeScore(){
    score = score + 1;
    labelScore.setText(score.toString());

}
function moveRight(){
    player.x = player.x + 10;
}
function moveLeft(){
    player.x = player.x - 10;
}
function moveUp() {
    player.y = player.y - 10;
}
function moveDown() {
    player.y = player.y + 10;
}

function generatePipe() {
    /*for (var count1 = 0; count1 < 6; count1 = count1 + 1) {
        var gapStart = game.rnd.integerInRange(1, 5);
        for (var count = 0; count < 8; count = count + 1) {
            if (count != gapStart && count != gapStart + 1) {
                addPipeBlock(count1 * 150, count*50);
            }
        }
    }
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }*/
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
    for(var y = gapStart; y > 0; y -= blockHeight ){
        addPipeBlock(width,y - blockHeight);
    }
    for(var y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }

       changeScore();
   /* addPipeEnd(width-5,gapStart - 25);

    for(var y=gapStart - 75; y>-50; y -= 50){
        addPipeBlock(width,y);
    }
    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart-pipeEndHeight);
    for(var y=gapStart-pipeEndHeight; y>0 ; y-=blockHeight) {
        addPipeBlock(width,y - blockHeight);
    }

    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart+gapSize);
    for(var y=gapStart+gapSize+pipeEndHeight; y<height; y+=blockHeight) {
        addPipeBlock(width,y);
    }



    addStar(width, gapStart + (gapSize / 2) - (starHeight / 2));

    addPipeEnd(width-5,gapStart+pipeGap);
    for(var y=gapStart + pipeGap + 25; y<height; y += 50){
        addPipeBlock(width,y);
    }*/
}

function addPipeBlock(x, y) {
// create a new pipe block
    var pipeBlock = game.add.sprite(x,y,"pipe");
// insert it in the 'pipes' array
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;
}
/*function addPipeEnd(x, y) {
// create a new pipe block
    var pipeEnd = game.add.sprite(x,y,"pipend");
// insert it in the 'pipes' array
    pipes.push(pipeEnd);
    game.physics.arcade.enable(pipeEnd);
    pipeBlock.body.velocity.x = -gameSpeed;
}*/

function playerJump() {
    player.body.velocity.y = -jumpPower;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    if (started) {
        for (var index = 0; index < pipes.length; index++) {
            game.physics.arcade
                .overlap(player,
                pipes[index],
                gameOver);
        }
        if (player.body.y < 0 || player.body.y > 400) {
            gameOver();
        }
        // player.rotation += 1;
        player.rotation = Math.atan(player.body.velocity.y / gameSpeed);

        for (var i = balloons.length - 1; i >= 0; i--) {
            game.physics.arcade.overlap(player, balloons[i], function () {

                changeGravity(-50);
                balloons[i].destroy();
                balloons.splice(i, 1);
                changeScore()
            });
        }
        for (var i = weights.length - 1; i >= 0; i--) {
            game.physics.arcade.overlap(player, weights[i], function () {

                changeGravity(50);
                weights[i].destroy();
                weights.splice(i, 1);

            }, gameOver);
        }
       /* for(var i=stars.length - 1; i>=0; i--){
            game.physics.arcade.overlap(player,stars[i], function(){
                stars[i].destroy();
                stars.splice(i,1);
                changeScore();
            });
        }*/

        // checkBonus(balloons, -50);
        // checkBonus(weights, 50);

    }

}

/*function checkBonus(bonusArray, bonusEffect){
    for(var i=bonusArray.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,bonusArray[i], function(){
            changeGravity(bonusEffect);
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
        });
    }
}*/

function gameOver(){

    //game.add.text(0, 0, "Game Over", {font: "50px Highway Gothic", fill: "#FFFFFF"});
   //game.destroy();
    // game.paused(true);
    game.paused = true;
    $("#score").val(score.toString());
    $("#greeting").show();
    score = 0;
    //$("#greeting").hide();
    //game.state.restart();
    //location.reload();
    gameGravity = 200;
   // stars = [];

}

$.get("/score", function(scores){
    //console.log("Data: ",scores);
    //for (var i = 0; i < scores.length; i++) {
        //$("#scoreBoard").append(
           // "<li>" +
           // scores[i].name + ": " + scores[i].score +
            //"</li>");
    scores.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
//    for (var i = 0; i < scores.length; i++) {
    for (var cat = 0; cat < 5; cat++) {
        $("#scoreBoard").append(
            "<li>" +
            scores[cat].name + ": " + scores[cat].score +
            "</li>");
    }
    if(isEmpty(fullName)) {
        response.send("Please make sure you enter your name.");
    }
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}

function generateBalloon(){
    var bonus = game.add.sprite(width, height, "balloon");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = -200;
    bonus.body.velocity.y = -game.rnd.integerInRange(60,100);
}

function generateWeight(){
    var bomb = game.add.sprite(width, 0, "weight");
    weights.push(bomb);
    game.physics.arcade.enable(bomb);
    bomb.body.velocity.x = -200;
    bomb.body.velocity.y = game.rnd.integerInRange(60,100);
}

function generate() {
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
        generateBalloon();
    } else if(diceRoll==2) {
        generateWeight();
    } else {
        generatePipe();
    }
}
/*var arr = ["zero", "one", "two", "three", "four"];
for(var i = 0; i < arr.length; i++){
    console.log(arr + " " + i + "th is " + arr[i]);
    arr.splice(i, 1);
}*/

function start(){
    started = true
    game.input.onDown.add(clickHandler);
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = -300;
    player.body.gravity.y = gameGravity;
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    pipeInterval = 1.80;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generate);
    splashDisplay.destroy();

}

/*function addStar(x,y) {
    var star = game.add.sprite(x, y, "star");
    stars.push(star);
    game.physics.arcade.enable(star);
    star.body.velocity.x = - gameSpeed;
}*/