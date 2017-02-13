// JavaScript Document
gameHeight = 0;
gameWidth = 0;
r_counter = 0;
g_counter = 0;
b_counter = 0;
connected_counter = 0;

rvalue = 255;
gvalue = 255;
bvalue = 255;

r_switch = $('#r-switch');
r_plug = $('#r-plug');
g_switch = $('#g-switch');
g_plug = $('#g-plug');
b_switch = $('#b-switch');
b_plug = $('#b-plug');

r_plug.mousedown(rmdown);
g_plug.mousedown(gmdown);
b_plug.mousedown(bmdown);

function rmdown(){
	c = 1;
	preloadImage();
	mdown();
}
function gmdown(){
	c = 2;
	mdown();
}
function bmdown(){
	c = 3;
	mdown();
}

function mdown(){
	if (c === 1){
r_switch.css("background-position","0 -40px");
r_counter++;
if (r_counter === 4){
	r_counter = 0;
	rvalue = 255;
	setSkillColor();		
}
} else if (c === 2){
g_switch.css("background-position","0 -40px");
g_counter++;
if (g_counter === 4){
	g_counter = 0;	
	gvalue = 255;
	setSkillColor();	
}
} else if (c === 3){
b_switch.css("background-position","0 -40px");
b_counter++;
if (b_counter === 4){
	b_counter = 0;
	bvalue = 255;
	setSkillColor();	
} 
}
}

r_plug.mouseup(mup);
g_plug.mouseup(mup);
b_plug.mouseup(mup);

function mup(){
	if (c === 1){
		if (r_counter === 2){
			rvalue = 220;
			}
else if (r_counter === 3){
r_switch.css("background-position","0 0px");
rvalue = 0;
} else {
r_switch.css("background-position","0 -80px");	
}
	} else if (c === 2){
		if (g_counter === 2){
			gvalue = 220;
			}
else if (g_counter === 3){
g_switch.css("background-position","0 0px");
gvalue = 0;
} else {
g_switch.css("background-position","0 -80px");	
}
	} else if (c === 3){
if (b_counter === 2){
			bvalue = 220;
			}
else if (b_counter === 3){
b_switch.css("background-position","0 0px");
bvalue = 0;
} else {
b_switch.css("background-position","0 -80px");	
}
	}
	if (r_counter === 3 && g_counter === 3 && b_counter === 3){
	if (connected_counter <= 2) {
connected_counter += 1;
	} else if (connected_counter === 3) {
		connected_counter = 0;
	}
}

	if (connected_counter === 2 && r_counter === 0 && g_counter === 0 && b_counter === 0) {
		gameHeight = document.getElementById("skillboxskills").clientHeight-25;
		gameWidth = document.getElementById("skillboxskills").clientWidth;
		skills.css("display","none");
		$('#skillboxskills').removeClass("nosignal");
		gameon = true;
		runAdventure();
		$('#adventure_canvas').css("display","initial");
	} else {
	setSkillColor();	
	}
}
//rvalue + gvalue + bvalue > 255 || rvalue + gvalue + bvalue === 220
skills = $('.skills');
gameon = false;
function setSkillColor(){
	if (connected_counter === 3 && r_counter === 3 && g_counter === 3 && b_counter === 3 && gameon === true){
		$('#skillboxskills').removeClass("nosignal");
		$('#skillboxskills').addClass("fuzz");
		$('#adventure_canvas').remove();
		skills.css("display","initial");
		gameon = false;
		connected_counter = 0;
	}
	if (connected_counter === 2 && gameon === true && (r_counter === 3 ||  g_counter === 3 ||  b_counter === 3)){
		$('#skillboxskills').addClass("nosignal");
		skills.css("display","initial");
		$('#adventure_canvas').remove();
	}
	if (connected_counter <= 2 && gameon === false){
		if (connected_counter === 2 && (r_counter === 0 ||  g_counter === 0 ||  b_counter === 0)){
			$('#skillboxskills').addClass("nosignal");
			$('#skillboxskills').removeClass("fuzz");
			skills.css("visibility","hidden");
		}
		if (!(connected_counter === 2 && (r_counter === 0 ||  g_counter === 0 ||  b_counter === 0))){
			
			if (r_counter === 1 || g_counter === 1 || b_counter === 1){ skills.css("transition", "none"); }
			
			
			skills.css("color","rgb("+ rvalue +","+ gvalue +","+ bvalue +")");
			
			if (rvalue === 0 && gvalue === 0 && bvalue === 0){
				skills.css("visibility","hidden");
				skills.css("transition", "color 2s");
				$('#skillboxskills').addClass("fuzz");
			} else { 
				skills.css("visibility","visible"); 
				$('#skillboxskills').removeClass("fuzz");
				skills.css("display","initial"); 
			}
		} 
	}
} 



function preloadImage()
{
    var img=new Image();
    img.src='http://broc.thesadmoon.com/wp-content/uploads/2016/10/blackstaticx.gif';
}
