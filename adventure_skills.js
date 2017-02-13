//Adventure.js
function runAdventure(){
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.style.width ='100%';
canvas.style.height='100%';
gameWidth -= 30;
ctx.canvas.width  = gameWidth;
ctx.canvas.height = gameHeight;
document.getElementById("skillboxskills").appendChild(canvas);
canvas.id = "adventure_canvas";
var highScore = 0;
var monsterPoints = 200;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "http://www.thesadmoon.com/adventure/images/sunny_gamebg.png";
// Hero image
var heroReady = false;
var heroleftImage = new Image();
heroleftImage.onload = function () {
	heroReady = true;
};
heroleftImage.src = "http://www.thesadmoon.com/adventure/images/knight.png";
//Flipped
var heroflipReady = false;
var heroflipImage = new Image();
heroflipImage.onload = function () {
	heroflipReady = true;
};
heroflipImage.src = "http://www.thesadmoon.com/adventure/images/knightflip.png";

var heroImage = heroflipImage;
var monsterisdeadCheck = false;
//Sword Swing
var swordswingReady = false;
var swordswingImage = new Image();
swordswingImage.onload = function () {
	swordswingReady = true;
};
swordswingImage.src = "http://www.thesadmoon.com/adventure/images/swordswing.png";

//Sword Down
var sworddownReady = false;
var sworddownImage = new Image();
sworddownImage.onload = function () {
	sworddownReady = true;
};
sworddownImage.src = "http://www.thesadmoon.com/adventure/images/sworddown.png";

//Sword Swing Left
var swordswingleftReady = false;
var swordswingleftImage = new Image();
swordswingleftImage.onload = function () {
	swordswingleftReady = true;
};
swordswingleftImage.src = "http://www.thesadmoon.com/adventure/images/swordswingleft.png";

//Sword Down Left
var sworddownleftReady = false;
var sworddownleftImage = new Image();
sworddownleftImage.onload = function () {
	sworddownleftReady = true;
};
sworddownleftImage.src = "http://www.thesadmoon.com/adventure/images/sworddownleft.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "http://www.thesadmoon.com/adventure/images/monster.png";

// Game objects

var hero = {
	dead: false,
	speed: 256, // movement in pixels per second
	x: 10,
	y: canvas.height-70
};
var monster = {
	dead: false,
  speed: 40,
	x: 10,
	y: 400
};
var monstersSlain = 0;
var deathCounter = 0;
// Handle keyboard controls
var keysDown = {};
var spaceDown = false;
var swordState = 0;
var heroFacing = "right";
var monsterFacing = "right";

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keydown", function (e) {
	if (e.keyCode === 16 && swordState === 0 && hero.dead === false) {
		swordState = 1;
	}

if (e.keyCode === 13 && hero.dead === true){
			monstersSlain = 0;
	hero.x = 10;
	hero.y = canvas.height-70;
		hero.dead = false;
		reset();
}
}, false);


addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	 clearInterval(lowerOpacityID);
	 	monster.dead = false;
		monsterisdeadCheck = false;
	  mOpacity = 0;
	// Throw the monster somewhere on the screen randomly
	if (hero.x < (gameWidth / 2)){
		monster.x = (Math.floor(Math.random() * (gameWidth - (gameWidth-gameWidth/2) + 1)) + (gameWidth-gameWidth/2)) - 64;
	} else {
		monster.x = 32 + (Math.floor(Math.random() * (gameWidth/2 - 0 + 1)) + 0) - 64;
			}
	monster.y = 32 + (Math.floor(Math.random() * (gameHeight - (gameHeight-170) + 1)) + (gameHeight-170)) - 64;
	monsterSpawn();
};

var sx = 20; //Clipped X position
// Update game objects
var update = function (modifier) {
  var d = new Date();
  var s = d.getMilliseconds();

if (hero.dead === false){
	if (87 in keysDown) { // Player holding up
    if (hero.y > canvas.height-170 - 60){
    hero.y -= hero.speed * modifier;
}
	}
	if (83 in keysDown) { // Player holding down
    if (hero.y < canvas.height-70){
    hero.y += hero.speed * modifier;
	}
}
	if (65 in keysDown) { // Player holding left
		heroFacing = "left";
    heroImage = heroleftImage;
    if (hero.x > 10) {
		hero.x -= hero.speed * modifier;
  }
    heroWalk();
	}
	if (68 in keysDown) { // Player holding right
		heroFacing = "right";
    heroImage = heroflipImage;
    if (hero.x < canvas.width-50) {
		hero.x += hero.speed * modifier;
  }
    heroWalk();
	}
}

function heroWalk() {
  if (s < 249 || (s > 500 && s < 749)){
    sx = 99;
  } else {
    sx = 20;
  }
}

//Monster Movement
	if (hero.dead === false && monster.dead === false){
if (hero.y+30+1 < monster.y){
  monster.y -= monster.speed * modifier;
} else if (hero.y+30-1 > monster.y){
  monster.y += monster.speed * modifier;
} else {
  monster.y = hero.y+30;
}
if (hero.x+1 < monster.x){
  monster.x -= monster.speed * modifier;
} else if (hero.x-1 > monster.x) {
  monster.x += monster.speed * modifier;
} else {
  monster.x = hero.x;
}
}


	//Are they touching?
	if (hero.dead === false && monster.dead === false){
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 40)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 60)
	) {
		hero.dead = true;
		deathCounter++;
	}
}

	//Sword hits monster
	if ( (monster.dead === false
		&& monsterisdeadCheck === false
	  && swordState === 1
		&& heroFacing === "right"
		&& hero.x+40 <= (monster.x + 32)
		&& monster.x <= (hero.x + 72)
		&& hero.y+10 <= (monster.y + 32)
		&& monster.y <= (hero.y + 50))
		|| (monster.dead === false
		&& monsterisdeadCheck === false
	  && swordState === 1
		&& heroFacing === "left"
		&& hero.x-25 <= (monster.x+32)
		&& monster.x+32 <= (hero.x+32)
		&& hero.y+10 <= (monster.y + 32)
		&& monster.y <= (hero.y + 50))) {
		monstersSlain += 200;
		monsterFacing = heroFacing;
		monster.dead = true;
		monsterisdeadCheck = true;
		setTimeout(lowermOpacity, 300);
	}

  if (monstersSlain > highScore){
  highScore = monstersSlain;
  }
};

var mOpacity = 0;
var lowerOpacityID;
var raiseOpacityID;
function lowermOpacity(){
 lowerOpacityID =	setInterval(lowerOpacity, 20);
setTimeout(reset, 400);
}

function lowerOpacity(){
		if (mOpacity > 0 && monster.dead === true) {
		mOpacity -= 0.05;
		if (mOpacity < 0){
			mOpacity = 0;
		}
	}
}

function monsterSpawn(){
raiseOpacityID = setInterval(raiseOpacity, 20);
	setTimeout( function(){
		clearInterval(raiseOpacityID);
	}, 400);
}

function raiseOpacity(){
	if (mOpacity < 1 && monster.dead === false) {
	mOpacity += 0.05;
	if (mOpacity > 1){
		mOpacity = 1;
	}
}
}

// Draw everything
var render = function () {
	ctx.canvas.width  = canvas.offsetWidth;
	ctx.canvas.height = gameHeight;
  ctx.globalAlpha=1;

	if (bgReady) {
		ctx.drawImage(bgImage, 0, (gameHeight-1080));
	}

	if (heroReady && heroflipReady) {
    ctx.shadowBlur=7;
    ctx.shadowColor="black";
    ctx.shadowOffsetX=3;
    ctx.shadowOffsetY=3;
		if (hero.dead === true){
			if (heroFacing === "right") {heroImage = heroflipImage;}
			else {heroImage = heroleftImage;}
			ctx.drawImage(heroImage, 410, 27, 60, 43, hero.x, hero.y+17, 60, 43);
		}
		else if (swordState === 1){
			if (heroFacing === "right") {
			heroImage = swordswingImage;
			var newherox = hero.x;
		} else {
			heroImage = swordswingleftImage;
			var newherox = hero.x-35;
		 }
			ctx.drawImage(heroImage, 0, 0, 75, 60, newherox, hero.y, 75, 60);
			setTimeout(function() {
				swordState = 2;
			}, 50);
		} else if (swordState === 2){
			if (heroFacing === "right") {
			heroImage = sworddownImage;
			var newherox = hero.x;
		} else {
			heroImage = sworddownleftImage;
	  	var newherox = hero.x-35;
	 }
			ctx.drawImage(heroImage,  0, -2, 75, 60, newherox, hero.y, 75, 60);
			setTimeout(function() {
				swordState = 0;
			}, 50);
		} else {
			if (heroFacing === "right"){
			heroImage = heroflipImage;
		} else { heroImage = heroleftImage; }
		ctx.drawImage(heroImage, sx, 10, 40, 60, hero.x, hero.y, 40, 60);
	}
	}
  ctx.shadowBlur=0;
ctx.shadowOffsetX=0;
ctx.shadowOffsetY=0;
	if (monsterReady) {
		if (monster.dead === true){
			var newmonsterx = monster.x;
			var newmonstery = monster.y;
			ctx.globalAlpha = mOpacity;
     	ctx.shadowBlur=3;
	ctx.shadowColor="rgba(0,0,255,0.9)";
	ctx.shadowOffsetX=1;
	ctx.shadowOffsetY=1;
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "1.3em monospace";
    ctx.textAlign = "left"
    ctx.fillText(monsterPoints, monster.x-3, monster.y-10);
		     	ctx.shadowBlur=0;
					ctx.shadowOffsetX=0.1;
					ctx.shadowOffsetY=0.1;
						ctx.shadowColor="rgba(255,0,0,1)";
			ctx.save();
	    ctx.translate(newmonsterx,newmonstery);
if (monsterFacing === "right"){
			ctx.rotate(90*Math.PI/180);
			ctx.drawImage(monsterImage, 5, -30);
		} else {
			ctx.rotate(-90*Math.PI/180);
			ctx.drawImage(monsterImage, -35, -3);
		}
			  ctx.restore();
		}
    else  {
			ctx.globalAlpha = mOpacity;
      ctx.drawImage(monsterImage, monster.x, monster.y);
    }
	}

//Death Text
if (hero.dead === true){
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.fillRect(0,0,gameWidth,gameHeight);
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "32px monospace";
	ctx.textAlign = "center";
	ctx.shadowBlur=3;
	ctx.shadowColor="rgba(0,0,255,0.9)";
	ctx.shadowOffsetX=1;
	ctx.shadowOffsetY=1;
		ctx.fillText("- ENTER to restart -", gameWidth/2, gameHeight/2);
}
  ctx.globalAlpha=1;
	// Score
	ctx.shadowBlur=3;
	ctx.shadowColor="rgba(0,0,255,0.9)";
	ctx.shadowOffsetX=1;
	ctx.shadowOffsetY=1;
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "1.5em monospace";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText("High Score: " + highScore, gameWidth-gameWidth/100*5, 55);
	ctx.textAlign = "left";
	ctx.fillText("Death Counter: " + deathCounter, gameWidth/100*5, 55);
	ctx.textAlign = "center";
		ctx.fillText("Controls: WASD + Shift", gameWidth/2, 5);
		ctx.fillText("Points: " + monstersSlain, gameWidth/2, 55);

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
}
