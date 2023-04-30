//when page is loaded
$(document).ready(function () {
  //accessibility enhancements
var h1size = $("h1").css("fontSize")
          $("h1").hover(
            function(){
            $(this).css("fontSize", "40px");
          }, 
          function(){
            $(this).css("fontSize", h1size);
  })
  
  var psize = $("p").css("fontSize")
          $("p").hover(
            function(){
            $(this).css("fontSize", "20px");
          }, 
          function(){
            $(this).css("fontSize", psize);
  })

var lisize = $(".paws li").css("fontSize")
          $("li").hover(
            function(){
            $(this).css("fontSize", "25px");
          }, 
          function(){
            $(this).css("fontSize", lisize);
  })

var logo = $(".logo a").css("opacity")
          $(".logo a").hover(
            function(){
            $(this).css("opacity", "0.5");
          }, 
          function(){
            $(this).css("opacity", logo);
  })

  var social = $(".social-media a").css("opacity")
          $(".social-media a").hover(
            function(){
            $(this).css("opacity", "0.5");
          }, 
          function(){
            $(this).css("opacity", social);
  })

  var links = $("p span, #main-menu a, .accessibility a").css("color")
          $("p span, #main-menu a").hover(
            function(){
            $(this).css("color", "#ff0000");
          }, 
          function(){
            $(this).css("color", links);
  })

});
var myVar = setInterval(myTimer, 1000);
var hours = ["12",
"01","02","03","04","05","06","07","08","09","10","11","12",
"01","02","03","04","05","06","07","08","09","10","11"];
var months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December",
];
function myTimer() {
var date = new Date();
document.getElementById("date").innerHTML =
date.getDate() +
"-" +
months[date.getMonth()] +
"-" +
date.getFullYear();
document.getElementById("hours").innerHTML = hours[date.getHours()];
document.getElementById("minutes").innerHTML = date.getMinutes()<10?"0"+date.getMinutes() :date.getMinutes();
document.getElementById("seconds").innerHTML = date.getSeconds()<10?"0"+date.getSeconds() :date.getSeconds();
document.getElementById("ampm").innerHTML = date.getHours()<12?"AM":"PM";

if (document.getElementById("colon1").innerHTML.includes(":"))
{

document.getElementById("colon2").innerHTML = "";
document.getElementById("colon1").innerHTML = "";
}
else
{

document.getElementById("colon2").innerHTML = ":";
document.getElementById("colon1").innerHTML = ":";
}

}

var gamewidth = 640;			//The width of the game
var gameheight = 480;			//The height of the game
var background;
var gem;
var gemspeed = 10;
var invader;
var invaderspeed = 4;
var laser;
var laserspeed = 10;
var lasermoving = false;
var akey;
var dkey;
var wkey;
var wordscore;
var score = 0;
var wordlives;
var lives = 10;
var scope;


//DO NOT CHANGE
var game = new Phaser.Game(gamewidth, gameheight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
	game.load.audio('backgroundsound','backgroundsound.wav');
	game.load.audio('hitsound','hitsound.mp3');
	game.load.audio('lasersound','lasersound.wav');
	game.load.image('background','background.jpg');
	game.load.image('invader','invader.png');
	game.load.image('gem','gem.png');	
	game.load.image('laser','laser.png');
	game.load.image('scope','scope.png');
	
}
function create(){
	backgroundsound = game.add.audio('backgroundsound');
	backgroundsound.volume = 2;
	backgroundsound.loop = true;	
	backgroundsound.play();

	lasersound = game.add.audio('lasersound');
	lasersound.volume = 5;

	hitsound = game.add.audio('hitsound');
	hitsound.volume = 9;
	
	background = game.add.sprite(0,0,'background');
	background.width = gamewidth;
	background.height = gameheight;

	gem = game.add.sprite(gamewidth/2,gameheight-50,'gem');
	gem.width /= 3;
	gem.height /= 3;
	gem.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(gem);
  gem.inputEnabled = true;
	gem.events.onInputDown.add(clickedgem, this);

	laser = game.add.sprite(gamewidth/2,gameheight+50,'laser');
	laser.width /= 5;
	laser.height /= 5;
	laser.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(laser);	
	
	invader = game.add.sprite(gamewidth/2,-50,'invader');
	invader.width /= 3;
	invader.height /= 3;
	invader.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(invader);
	invader.inputEnabled = true;
	invader.events.onInputDown.add(clickedinvader, this);

	scope = game.add.sprite(-100,-100,'scope');
	scope.width /= 8;
	scope.height /= 8;
	scope.anchor.setTo(0.5,0.5);

	cursors = game.input.keyboard.createCursorKeys();
	akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

wordscore = game.add.text(20,20,"score " + score,{fontSize: '24px', fill: '#FFFFFF'});
wordlives = game.add.text(gamewidth-100,20,"Lives " + lives,{fontSize: '24px', fill: '#FFFFFF'});

}
function update(){
	//SCOPE
	scope.x = game.input.x;
	scope.y = game.input.y;
	//GEM
	gem.angle = 0;
	if(akey.isDown){
			gem.x -=gemspeed;
			gem.angle -=5;
	}
	if(dkey.isDown){
			gem.x +=gemspeed;
			gem.angle +=5;
	}
	//INVADER
	invader.y += invaderspeed;
	if(invader.y >= gameheight + 50){
		invader.y = -50;
		invader.x = game.rnd.integerInRange(50,gamewidth - 50);
	}
	//LASER
	if(wkey.isDown && lasermoving == false){
			laser.x = gem.x;
			laser.y = gem.y;
			lasermoving = true;
			lasersound.play();
	}
	if(lasermoving == true){
		laser.y -= laserspeed;
	}
	if(laser.y < -50){
		lasermoving = false;
	}

	game.physics.arcade.overlap(laser,invader,hitinvader,null,this);
	game.physics.arcade.overlap(gem,invader,hitgem,null,this);
  
} //end update

function hitinvader(){
	score += 2; //Adds 1 to score
	wordscore.text = "Score " + score;
	hitsound.play();
	lasermoving = false;
	laser.y = gameheight + 50;
	invader.y = -50;
	invader.x = game.rnd.integerInRange(50,gamewidth - 50);
}

function hitgem(){
	lives -= 1; //Subtract a life
	wordlives.text = "Lives " + lives;
	hitsound.play();
	lasermoving = false;
	laser.y = gameheight + 50;
	invader.y = -50;
	invader.x = game.rnd.integerInRange(50,gamewidth - 50);
	gem.x = gamewidth/2;
}

function clickedinvader(){
	invader.width += 5;
	invader.height += 5;
}
function clickedgem(){
	gem.width += 5;
	gem.height += 5;
}
