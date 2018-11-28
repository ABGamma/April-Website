var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


angleMode = "radians";
//This program is a game in which an icecream truck flys to avoid obstacles
//By: Andrew Gamma

//when checking damage on the truck, if "invincible == 1" prevent damage

//Developer tools
//press w to make the storm clouds appear
//press i + o to instantly activate SUNDAE MODE
//press l to increment the laser beams


//Usage of the laser beams: set pikachuEnemy.laser to 0 for no lasers
//set pikachuEnemy.laserActive to 1 to enable lasers, to 0 to disable 
//set enemy.laser to 1 for a soft eye glow, increment to 2 and 3 to intensify
//set enemy laser to 4 or higher to display the actual lasers 

/*
//i = 0 : all 7 balloons
//i = 1 : 7 balloons, 1 puncture
//i = 2 : 6 balloons
//i = 3 : 6 balloons, 1 puncture
//i = 4 : 5 balloons
//i = 5 : 5 balloons, 1 puncture
//i = 6 : 4 balloons
//i = 7 : 4 balloons, 1 puncture
//i = 8 : 3 balloons
//i = 9 : 3 balloons, 1 puncture 
//i = 10: 2 balloons
//i = 11: 2 balloons, 1 puncture
//i = 12: 1 balloon
//i = 13: 1 balloon, 1 puncture
//i = 14: no balloons

//Level 1: i goes from [8, 14]
//Level 2: i goes from [4, 14]
//Level 3: i goes from [0, 14]
*/



//Variables
var bullets = [];
var f;
var randomStarAtk = random(60, 90);
var frameCnt = 0;
var cloudCount = 0;
var myi = 0;
var invCnt = 0;
var stars = [];
var trucks = [];
var keys = [];
var buildings = [];
var myLines = [];
var curBullet = 0;
var FrameCount = 0;
var pikaLight = [];
var lightBallDraw = 0;
var constant = 0;
var a = random(1500);
var cloudSize = 0;
var cloudStart = 0;
var bananaPowUp = 0;
var cherryPowUp = 0;
var sundae = 0;
var setupDone = 0;
var invincible = 0;
var dispTrk = 0;
var endGameCounter = 0;
var lost = 0;
var newLivesEnabled = 1;

//pikachu

var pikaBalloons = [];
var pikaPoints = []; var pP2 = [];
var pp2 = []; var PP2 = [];
var pp3 = []; var PP3 = [];
var pp4 = []; var PP4 = [];
var pp5 = []; var PP5 = [];
var pp55 = []; var PP55 = [];
var pp6 = []; var PP6 = [];
var pointsBlue = [];var p2Blue = [];
var pointsBlue2 = [];var p2Blue2 = [];
var pointsGrey = [];var p2Grey = [];
var pointsPink = [];var p2Pink = [];
var pointsPink2 = [];var p2Pink2 = [];
var pointsPur = [];var p2Pur = [];
var pointsBrn = [];var p2Brn = [];
var pointsBrn2 = [];var p2Brn2 = [];
var pointsYel2 = [];var p2Yel2 = [];
var pointsYel = [];var p2Yel = [];
var pointsGreen = [];var p2Green = [];
var pointsGreen2 = [];var p2Green2 = [];

var banana = [];
var cherry = [];

var balloonCount = 0;


var myTimer;
var hitBox;
var GameState = 'menu';
var menuSelect = 'play';
var upStill = 0;
var downStill = 0;
var enterStill = 0;
var playing = 0;
var scrollingTitle = 400;
var scrollingTitle2 = 1600;


//Pikachu Drawing Functions
var splitPoints = function(points, p2) {
  p2.splice(0, p2.length);
  for (var i = 0; i < points.length-1; i++){
      p2.push(new PVector(points[i].x, points[i].y));
      p2.push(new PVector((points[i].x + points[i+1].x)/2, (points[i].y+points[i+1].y)/2));
  }
  p2.push(new PVector(points[i].x, points[i].y));
  p2.push(new PVector((points[0].x+points[i].x)/2, (points[0].y+points[i].y)/2));
  
};
var average = function(points, p2) {
    for (var i = 0; i < p2.length - 1; i++){
        var x = (p2[i].x + p2[i+1].x)/2;
        var y = (p2[i].y + p2[i+1].y)/2;
        p2[i].set(x, y);
    }
    var x = (p2[i].x + points[0].x)/2;
    var y = (p2[i].y + points[0].y)/2;
    points.splice(0, points.length);
    for (i=0; i < p2.length; i++) {
        points.push(new PVector(p2[i].x, p2[i].y));
    }
};
var subdivide = function(points, p2) {
    splitPoints(points, p2);
    average(points, p2);  
};
var shapez = function(points, c1, c2, c3, cz) {
beginShape();
fill(c1, c2, c3, cz);
for (var i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);}
vertex(points[0].x, points[0].y);
endShape();
};
var puncture = function(x, y, c1, c2, c3) {
    stroke(0, 0, 0);
    strokeWeight(0.4);
fill(0, 0, 0);
ellipse(x, y, 10, 10);
fill(c1, c2, c3);
triangle(x-4, y-5, x+4, y-5, x, y-12);
triangle(x+4, y-5, x+6, y, x+12, y-7);
triangle(x+6, y, x+4, y+5, x+12, y+7);
triangle(x-4, y+5, x+4, y+5, x, y+12);
triangle(x-4, y-5, x-6, y, x-12, y-7);
triangle(x-6, y, x-4, y+5, x-12, y+7);
noStroke();
};
var createPoints = function() {
   
cherry.push(new PVector(200, 180));
cherry.push(new PVector(200, 180));
cherry.push(new PVector(170, 170));
cherry.push(new PVector(100, 250));
cherry.push(new PVector(200, 350));
cherry.push(new PVector(300, 250));
cherry.push(new PVector(230, 170));
cherry.push(new PVector(210, 190));
cherry.push(new PVector(210, 190));
cherry.push(new PVector(250, 70));
cherry.push(new PVector(270, 50));
cherry.push(new PVector(240, 70));
subdivide(cherry, pP2);
subdivide(cherry, pP2);
subdivide(cherry, pP2);
   
   
   
banana.push(new PVector(50, 10));
banana.push(new PVector(200, 210));
banana.push(new PVector(390, 350));
banana.push(new PVector(250, 330));
banana.push(new PVector(100, 250));
subdivide(banana, pP2);
subdivide(banana, pP2);
subdivide(banana, pP2);
subdivide(banana, pP2);

pointsBlue.push(new PVector(-10, 133));
pointsBlue.push(new PVector(50, 183));
pointsBlue.push(new PVector(50, 183));
pointsBlue.push(new PVector(68, 155));
pointsBlue.push(new PVector(43, 171));
   
subdivide(pointsBlue, p2Blue);
subdivide(pointsBlue, p2Blue);

pointsBlue2.push(new PVector(20, 100));
pointsBlue2.push(new PVector(60, 99));
pointsBlue2.push(new PVector(70, 140));
pointsBlue2.push(new PVector(70, 140));
pointsBlue2.push(new PVector(50, 111));
   
subdivide(pointsBlue2, p2Blue2);
subdivide(pointsBlue2, p2Blue2);

pointsPink.push(new PVector(40, 93));
pointsPink.push(new PVector(95, 153));
pointsPink.push(new PVector(95, 153));
pointsPink.push(new PVector(112, 130));
pointsPink.push(new PVector(108, 125));
pointsPink.push(new PVector(93, 135));
   
subdivide(pointsPink, p2Pink);
subdivide(pointsPink, p2Pink);

pointsPink2.push(new PVector(70, 43));
pointsPink2.push(new PVector(100, 35));
pointsPink2.push(new PVector(135, 63));
pointsPink2.push(new PVector(130, 103));
pointsPink2.push(new PVector(115, 120));
pointsPink2.push(new PVector(115, 120));
pointsPink2.push(new PVector(125, 60));
   
subdivide(pointsPink2, p2Pink2);
subdivide(pointsPink2, p2Pink2);
subdivide(pointsPink2, p2Pink2);

pointsGrey.push(new PVector(115, 140));
pointsGrey.push(new PVector(150, 175));
pointsGrey.push(new PVector(150, 175));
pointsGrey.push(new PVector(167, 152));
pointsGrey.push(new PVector(150, 160));
pointsGrey.push(new PVector(143, 160));
   
subdivide(pointsGrey, p2Grey);
subdivide(pointsGrey, p2Grey);
subdivide(pointsGrey, p2Grey);


pointsGreen.push(new PVector(117, 85));
pointsGreen.push(new PVector(160, 135));
pointsGreen.push(new PVector(160, 135));
pointsGreen.push(new PVector(184, 109));
pointsGreen.push(new PVector(157, 122));
   
subdivide(pointsGreen, p2Green);
subdivide(pointsGreen, p2Green);

pointsGreen2.push(new PVector(150, 30));
pointsGreen2.push(new PVector(180, 32));
pointsGreen2.push(new PVector(205, 60));
pointsGreen2.push(new PVector(198, 87));
pointsGreen2.push(new PVector(179, 112));
pointsGreen2.push(new PVector(195, 57));
   
subdivide(pointsGreen2, p2Green2);
subdivide(pointsGreen2, p2Green2);
subdivide(pointsGreen2, p2Green2);

pointsPur.push(new PVector(160, 140));
pointsPur.push(new PVector(190, 175));
pointsPur.push(new PVector(190, 175));
pointsPur.push(new PVector(207, 152));
pointsPur.push(new PVector(190, 165));
   
subdivide(pointsPur, p2Pur);
subdivide(pointsPur, p2Pur);

pointsYel.push(new PVector(187, 115));
pointsYel.push(new PVector(222, 164));
pointsYel.push(new PVector(222, 164));
pointsYel.push(new PVector(247, 141));
pointsYel.push(new PVector(219, 152));
   
subdivide(pointsYel, p2Yel);
subdivide(pointsYel, p2Yel);

pointsYel2.push(new PVector(220, 60));
pointsYel2.push(new PVector(250, 62));
pointsYel2.push(new PVector(275, 90));
pointsYel2.push(new PVector(268, 117));
pointsYel2.push(new PVector(249, 142));
pointsYel2.push(new PVector(265, 87));
   
subdivide(pointsYel2, p2Yel2);
subdivide(pointsYel2, p2Yel2);
subdivide(pointsYel2, p2Yel2);

pointsBrn.push(new PVector(218, 172));
pointsBrn.push(new PVector(247, 217));
pointsBrn.push(new PVector(247, 217));
pointsBrn.push(new PVector(267, 202));
pointsBrn.push(new PVector(250, 206));
   
subdivide(pointsBrn, p2Brn);
subdivide(pointsBrn, p2Brn);

pointsBrn2.push(new PVector(265, 130));
pointsBrn2.push(new PVector(290, 150));
pointsBrn2.push(new PVector(288, 177));
pointsBrn2.push(new PVector(269, 202));
pointsBrn2.push(new PVector(285, 154));
   
subdivide(pointsBrn2, p2Brn2);
subdivide(pointsBrn2, p2Brn2);
};
createPoints();
var pikachu = function() {
    stroke(0, 0, 0);
    strokeWeight(0.8);
fill(250, 210, 34);
//ellipse(90, 250, 90, 90);

//Left Ear
pikaPoints.push(new PVector(60, 205));
pikaPoints.push(new PVector(60, 205));
pikaPoints.push(new PVector(65, 195));
pikaPoints.push(new PVector(60, 160));
pikaPoints.push(new PVector(40, 210));
pikaPoints.push(new PVector(45, 220));
pikaPoints.push(new PVector(45, 220));

//Left Face
pikaPoints.push(new PVector(40, 230));
pikaPoints.push(new PVector(35, 260));
pikaPoints.push(new PVector(50, 280));
pikaPoints.push(new PVector(50, 280));

//Left Hand
pikaPoints.push(new PVector(45, 290));
pikaPoints.push(new PVector(20, 300));
pikaPoints.push(new PVector(20, 300));
pikaPoints.push(new PVector(25, 306));
pikaPoints.push(new PVector(25, 306));
pikaPoints.push(new PVector(20, 310));
pikaPoints.push(new PVector(20, 310));
pikaPoints.push(new PVector(25, 314));
pikaPoints.push(new PVector(25, 314));
pikaPoints.push(new PVector(20, 318));
pikaPoints.push(new PVector(20, 318));
pikaPoints.push(new PVector(25, 322));
pikaPoints.push(new PVector(25, 322));
pikaPoints.push(new PVector(45, 320));
pikaPoints.push(new PVector(60, 310));
pikaPoints.push(new PVector(60, 310));

//Stomach
pikaPoints.push(new PVector(90, 330));
pikaPoints.push(new PVector(130, 360));
pikaPoints.push(new PVector(145, 355));
pikaPoints.push(new PVector(145, 355));
pikaPoints.push(new PVector(155, 368));
pikaPoints.push(new PVector(155, 368));
pikaPoints.push(new PVector(156, 362));
pikaPoints.push(new PVector(156, 362));
pikaPoints.push(new PVector(160, 367));
pikaPoints.push(new PVector(160, 367));
pikaPoints.push(new PVector(161, 362));
pikaPoints.push(new PVector(161, 362));
pikaPoints.push(new PVector(170, 365));
pikaPoints.push(new PVector(170, 365));
pikaPoints.push(new PVector(165, 360));
pikaPoints.push(new PVector(160, 345));
pikaPoints.push(new PVector(160, 345));
pikaPoints.push(new PVector(180, 345));
pikaPoints.push(new PVector(195, 335));
pikaPoints.push(new PVector(195, 335));

//Right Foot
pikaPoints.push(new PVector(220, 360));
pikaPoints.push(new PVector(220, 360));
pikaPoints.push(new PVector(220, 355));
pikaPoints.push(new PVector(220, 355));
pikaPoints.push(new PVector(227, 357));
pikaPoints.push(new PVector(227, 357));
pikaPoints.push(new PVector(227, 350));
pikaPoints.push(new PVector(227, 350));
pikaPoints.push(new PVector(235, 350));
pikaPoints.push(new PVector(235, 350));
pikaPoints.push(new PVector(215, 335));
pikaPoints.push(new PVector(202, 310));
pikaPoints.push(new PVector(195, 310));
pikaPoints.push(new PVector(195, 310));

//Back
pikaPoints.push(new PVector(190, 290));
pikaPoints.push(new PVector(160, 280));
pikaPoints.push(new PVector(130, 260));
pikaPoints.push(new PVector(125, 225));
pikaPoints.push(new PVector(115, 210));
pikaPoints.push(new PVector(115, 210));

//Right Ear
pikaPoints.push(new PVector(145, 195));
pikaPoints.push(new PVector(165, 165));
pikaPoints.push(new PVector(165, 165));
pikaPoints.push(new PVector(130, 175));
pikaPoints.push(new PVector(100, 200));
pikaPoints.push(new PVector(100, 200));
pikaPoints.push(new PVector(80, 200));

subdivide(pikaPoints, pP2);
subdivide(pikaPoints, pP2);


pp2.push(new PVector(51, 180));
pp2.push(new PVector(51, 180));
pp2.push(new PVector(60, 160));
pp2.push(new PVector(64, 191));
pp2.push(new PVector(64, 191));
pp2.push(new PVector(57, 175));
subdivide(pp2, PP2);
subdivide(pp2, PP2);

pp3.push(new PVector(151, 169));
pp3.push(new PVector(151, 169));
pp3.push(new PVector(165, 163));
pp3.push(new PVector(165, 163));
pp3.push(new PVector(158, 181));
pp3.push(new PVector(146, 191));
pp3.push(new PVector(146, 191));
pp3.push(new PVector(155, 175));
subdivide(pp3, PP3);
subdivide(pp3, PP3);

stroke(0, 0, 0);
strokeWeight(1);
//Cheek
pp4.push(new PVector(37, 255));
pp4.push(new PVector(37, 255));
pp4.push(new PVector(47, 256));
pp4.push(new PVector(42, 270));
pp4.push(new PVector(42, 270));
pp4.push(new PVector(37, 260));
subdivide(pp4, PP4);
subdivide(pp4, PP4);


//MOUTH
pp5.push(new PVector(52, 256));
pp5.push(new PVector(52, 256));
pp5.push(new PVector(56, 258));
pp5.push(new PVector(62, 253));
pp5.push(new PVector(62, 253));
pp5.push(new PVector(72, 255));
pp5.push(new PVector(80, 250));
pp5.push(new PVector(80, 250));
pp5.push(new PVector(75, 275));
pp5.push(new PVector(65, 275));
subdivide(pp5, PP5);
subdivide(pp5, PP5);

pp55.push(new PVector(57, 264));
pp55.push(new PVector(57, 264));
pp55.push(new PVector(72, 259));
pp55.push(new PVector(77, 267));
pp55.push(new PVector(77, 267));
pp55.push(new PVector(72, 277));
pp55.push(new PVector(65, 275));
subdivide(pp55, PP55);
subdivide(pp55, PP55);

pp6.push(new PVector(50, 225));
pp6.push(new PVector(55, 240));
pp6.push(new PVector(45, 250));
pp6.push(new PVector(40, 240));
subdivide(pp6, PP6);
subdivide(pp6, PP6);
subdivide(pp6, PP6);



};
pikachu();
var pika2 = function() {
shapez(pikaPoints, 250, 210, 34, 255);
shapez(pp2, 0, 0, 0, 255);
shapez(pp3, 0, 0, 0, 255);
shapez(pp4, 255, 0, 0, 255);
shapez(pp5, 84, 0, 0, 255);
shapez(pp55, 250, 135, 214, 255);
if(balloonCount < 14){
shapez(pp6, 0, 0, 0, 255);
fill(255, 255, 255);
ellipse(49, 235, 7, 7);}
else{fill(0, 0, 0);
quad(45, 230, 50, 225, 60, 240, 55, 245);
quad(60, 230, 55, 225, 45, 240, 50, 245);
}

fill(255, 0, 0);
ellipse(100, 250, 20, 20);
fill(0, 0, 0);
triangle(62, 245, 60, 250, 55, 246);

if(balloonCount < 14) {
    fill(0, 0, 0);
ellipse(85, 230, 15, 15);
    fill(255, 255, 255);
ellipse(82, 227, 7, 7);}
else{fill(0, 0, 0);
quad(75, 230, 80, 225, 90, 240, 85, 245);
quad(90, 230, 85, 225, 75, 240, 80, 245);
}

//TAIL
fill(242, 187, 14);
beginShape();
vertex(185, 290);
vertex(200, 287);
vertex(195, 265);
vertex(210, 260);
vertex(210, 220);
vertex(250, 195);
vertex(253, 180);
vertex(253, 145);
vertex(180, 200);
vertex(190, 255);
vertex(175, 257);
vertex(185, 280);
vertex(171, 285);
endShape();

fill(250, 210, 34);
beginShape();
vertex(250, 195);
vertex(253, 180);
vertex(253, 145);
vertex(180, 200);
vertex(180, 202);
endShape();

stroke(0, 0, 0);
strokeWeight(1);
noFill();
strokeJoin(ROUND);
beginShape();
vertex(36, 302);
vertex(32, 305);
vertex(38, 308);
endShape();
beginShape();
vertex(70, 290);
vertex(78, 293);
vertex(82, 292);
vertex(88, 288);
endShape();

//Right Arm
beginShape();
vertex(140, 267);
vertex(137, 270);
vertex(140, 275);
vertex(142, 285);
vertex(142, 295);
vertex(138, 305);
vertex(135, 307);
vertex(132, 308);
vertex(129, 308);
vertex(125, 308);
vertex(119, 306);
vertex(115, 300);
vertex(115, 290);
vertex(119, 295);
vertex(122, 288);
vertex(125, 293);
vertex(129, 288);
vertex(131, 295);
vertex(135, 290);
vertex(136, 298);
endShape();
beginShape();
vertex(118, 293);
vertex(119, 285);
vertex(121, 278);
endShape();

};
var balloons = function() {
noStroke();

//BLUE
if(balloonCount < 4){
fill(165, 207, 229);
ellipse(41, 130, 80, 80);
triangle(20, 164, 72, 155, 50, 190);    

shapez(pointsBlue, 121, 171, 196, 255);
shapez(pointsBlue2, 206, 248, 255, 255);

if(balloonCount === 3){
puncture(40, 140, 206, 248, 255);}}
else {pointsBlue = []; pointsBlue2 = [];}
 
//GREY   
if(balloonCount < 6) {
fill(200, 214, 205);
ellipse(145, 120, 80, 80);
triangle(120, 151, 176, 145, 150, 180);

shapez(pointsGrey, 159, 168, 162, 255);

if(balloonCount === 5) {
puncture(135, 135, 250, 264, 255);}}
else {pointsGrey = [];}

//PINK
if(balloonCount < 12) {
fill(238, 177, 202);
ellipse(90, 80, 100, 100);
triangle(60, 120, 124, 117, 95, 160);
quad(90, 155, 100, 155, 105, 162, 85, 162);

shapez(pointsPink, 207, 153, 176, 255);
shapez(pointsPink2, 255, 216, 241, 255);
if(balloonCount === 11){
puncture(80, 80, 255, 216, 241);}}
else{pointsPink = []; pointsPink2 = [];}

//PURPLE
if(balloonCount < 8){
fill(189, 163, 204);
ellipse(190, 120, 80, 80);
triangle(163, 150, 218, 149, 190, 180);
quad(185, 175, 195, 175, 200, 182, 180, 179);

shapez(pointsPur, 148, 135, 155, 255);
if(balloonCount ===7) {
puncture(185, 140, 219, 193, 234);}}
else {pointsPur = [];}

//ORANGE
if(balloonCount < 2) {
fill(209, 153, 81);
ellipse(255, 165, 80, 80);
triangle(195+25, 133+50, 260+25, 137+55, 245, 170+55);
quad(185+55, 175+45, 195+55, 175+45, 200+55, 182+45, 180+55, 179+45);

shapez(pointsBrn, 172, 133, 84, 255);
shapez(pointsBrn2, 248, 192, 119, 255);

if(balloonCount === 1) {
puncture(260, 170, 248, 192, 119);
}}
else {pointsBrn = []; pointsBrn2 = [];}

//YELLOW
if(balloonCount < 10) {
fill(230, 233, 82);
ellipse(230, 100, 95, 95);
triangle(195, 133, 260, 137, 220, 170);

shapez(pointsYel2, 255, 255, 120, 255);
shapez(pointsYel, 194, 190, 95, 255);
if(balloonCount === 9) {
puncture(220, 110, 255, 255, 120);}}
else {pointsYel = []; pointsYel2 = [];}

//GREEN
if(balloonCount < 14){
fill(154, 196, 75);
ellipse(160, 70, 95, 95);
triangle(130, 108, 190, 107, 160, 140);
quad(155, 135, 165, 135, 170, 142, 150, 142);
color(72, 105, 0);

shapez(pointsGreen, 128, 155, 96, 255);
shapez(pointsGreen2, 193, 235, 114, 255);
if(balloonCount === 13) {
puncture(150, 60, 193, 235, 114);}}
else{pointsGreen = []; pointsGreen2 = [];}

strokeWeight(1.5);
stroke(0, 0, 0);
if(balloonCount < 4){line(145, 270, 50, 190);}
if(balloonCount < 12){line(145, 270, 99, 163);}
if(balloonCount < 6){line(145, 270, 148, 180);}
if(balloonCount < 14) {line(145, 270, 160, 143);}
if(balloonCount < 8){line(145, 270, 188, 181);}
if(balloonCount < 10) {line(145, 270, 221, 170);}
if(balloonCount < 2){line(145, 270, 240, 225);}

noStroke();

};


//Object Declarations
var truckObj = function(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.lives = 3;
    this.invincible = 0;
    this.invincibleCnt = 0;
    this. invincibleFrames = 120;
    
};
var timer = function(initMil){
    this.zero = initMil;
    this.currentTime = 0;
};
var building = function(x,y,s){
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.w = random(9,12)*10;
    this.windows = 5;
};
var starObj = function(x, y, s, p){
    this.x = x;
    this.initx = x;
    this.y = y;
    this.inity = y;
    this.speed = s;
    this.period = p;
    this.frame = 0;
    this.vis = 0;
};
var truckHitBox = function(x, y, w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = w/1.5;
    this.inv = 0;
};
var bullet = function(){
    this.x = 0;
    this.y = 0;
    this.shot = 0;
    this.vis = 1;
    this.flaming = 0;
    var c = floor(random(0, 12));
    switch(c) {
        case 0: this.c1 = 255;
                this.c2 = 0;
                this.c3 = 0;
        break;
        case 1: this.c1 = 255;
                this.c2 = 128;
                this.c3 = 0;
        break;
        case 2: this.c1 = 255;
                this.c2 = 0;
                this.c3 = 128;
        break;
        case 3: this.c1 = 255;
                this.c2 = 255;
                this.c3 = 0;
        break;
        case 4: this.c1 = 255;
                this.c2 = 0;
                this.c3 = 255;
        break;
        case 5: this.c1 = 0;
                this.c2 = 255;
                this.c3 = 0;
        break;
        case 6: this.c1 = 0;
                this.c2 = 255;
                this.c3 = 128;
        break;
        case 7: this.c1 = 128;
                this.c2 = 255;
                this.c3 = 0;
        break;
        case 8: this.c1 = 0;
                this.c2 = 255;
                this.c3 = 255;
        break;
        case 9: this.c1 = 0;
                this.c2 = 0;
                this.c3 = 255;
        break;
        case 10: this.c1 = 128;
                this.c2 = 0;
                this.c3 = 255;
        break;
        case 11: this.c1 = 0;
                this.c2 = 128;
                this.c3 = 255;
        break;
        default: this.c1 = 255;
                this.c2 = 255;
                this.c3 = 255;
        break;
    }
    
};
var bananaObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.collected = 0;
};
var cherryObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.collected = 0;
};
var newLifeObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.collected = 0;
};

var enemy = function(x, y, z){
    this.x = x;
    this.y = y;
    this.frame = z;
    this.starthp = 400;
    this.curHp = 400;
    this.hp = 0;
    this.difficulty = 15;
    this.dir = 1;
    this.laser = 0;
    this.laserActive = 0;
};

var makeTruck = function() {
this.x = 200;
this.y = 200;
background(0, 0, 0, 0);
// Ice Cream Truck with A as cone and E as service area

    fill(255, 3, 175);
    
    //icecream
    strokeWeight(1);
    stroke(54, 54, 54);
    ellipse(this.x + 10,this.y-84,50,50);
    noStroke();
    fill(247, 121, 207);
    ellipse(this.x + 8,this.y - 100,20,10);
    
    //cone
    fill(0, 0, 0);
    rect(this.x + 60, this.y - 60,10,10);
    fill(251, 255, 145);
    stroke(235, 199, 54);
    triangle(this.x+30,this.y - 105,this.x + 20,this.y - 60,this.x + 120,this.y - 60);
    
    //cone cross hatching
    strokeWeight(1);
    stroke(224, 204, 130);
    line(this.x + 30,this.y - 105,this.x + 20,this.y - 60);
    line(this.x + 38,this.y - 100,this.x + 28,this.y - 60);
    line(this.x + 46,this.y - 96,this.x + 37,this.y - 60);
    line(this.x + 55,this.y - 92,this.x + 47,this.y - 60);
    line(this.x + 77,this.y - 81,this.x + 72,this.y - 60);
    line(this.x + 86,this.y - 76,this.x + 82,this.y - 60);
    line(this.x + 95,this.y - 71,this.x + 92,this.y - 60);
    line(this.x + 28,this.y - 90,this.x +120,this.y - 60);
    line(this.x + 24,this.y - 75,this.x + 120,this.y - 60);
    
    //the A
    strokeWeight(8);
    stroke(158, 138, 41);
    line(this.x + 30,this.y - 105,this.x + 120,this.y - 60);
    line(this.x + 120,this.y - 60,this.x + 20,this.y - 60);
    line(this.x + 66,this.y - 85,this.x + 60,this.y - 60);
    
    
    pikaBalloons.push(get(150, 50, 200, 100));
    
    //wheels
    fill(153, 153, 153);
    strokeWeight(9);
    stroke(0, 0, 0);
    ellipse(this.x,this.y,30,30);
    ellipse(this.x + 90,this.y,30,30);
    fill(217, 217, 217);
    noStroke();
    
    //body
    rect(this.x + 15,this.y - 50,105,50);
    rect(this.x - 30, this.y - 25,50,25);
    
    //Sevice Area
    noStroke();
    fill(255, 255, 255);
    rect(this.x + 41,this.y - 44,58,18);
    fill(255, 209, 255);
    rect(this.x + 41,this.y - 24,58,18);
    strokeWeight(1);
    stroke(0, 0, 0);
    fill(230, 230, 230);
    line(this.x + 100,this.y - 45,this.x + 100,this.y - 5);
    line(this.x + 100,this.y - 45,this.x + 65,this.y - 45);
    line(this.x + 100,this.y - 25,this.x + 60,this.y - 25);
    line(this.x + 100,this.y - 5,this.x + 65,this.y - 5);
    
    //outline of truck
    line(this.x + 120,this.y,this.x + 120,this.y - 50);
    rect(this.x + 120, this.y - 11,5,10);
    line(this.x + 120,this.y,this.x - 30,this.y);
    line(this.x + 120,this.y - 50,this.x + 15,this.y - 50);
    fill(255, 255, 255);
    triangle(this.x + 15,this.y -50,this.x - 10,this.y - 25,this.x + 15,this.y - 25);
    line(this.x - 10,this.y - 25,this.x - 30,this.y - 25);
    line(this.x - 30,this.y - 25,this.x -30,this.y);
    
    //Awning
    fill(255, 0, 0);
    rect(this.x + 41,this.y -44,59,5);
    fill(255, 255, 255);
    noStroke();
    rect(this.x + 45,this.y -44,2,5);
    rect(this.x + 55,this.y -44,2,5);
    rect(this.x + 65,this.y -44,2,5);
    rect(this.x + 75,this.y -44,2,5);
    rect(this.x + 85,this.y -44,2,5);
    rect(this.x + 95,this.y -44,2,5);
    
    //E
    stroke(0, 13, 255);
    strokeWeight(4);
    line(this.x + 40,this.y - 45,this.x + 40,this.y - 5);
    line(this.x + 40,this.y - 45,this.x + 65,this.y - 45);
    line(this.x + 40,this.y - 5,this.x + 65,this.y - 5);
    line(this.x + 40,this.y - 25,this.x + 60,this.y - 25);
    
    pikaBalloons.push(get(150, 50, 200, 200));
};

//Object display functions
truckHitBox.prototype.display = function(){
    noFill();
    //fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
};
building.prototype.display = function(tint){
    stroke(0, 0, 0,tint);
    strokeWeight(3);
    fill(this.r, this.g, this.b, tint);
    rect(this.x, this.y, this.w, 700);
    fill(176, 176, 176, tint);
    for(var i = this.y; i < 700; i+= 5 + this.w/this.windows*1.5){
        for(var j = this.x; j < (this.x + this.w - (this.w/3)); j += this.w/5){
            rect(j + 10, i + 10, (this.w/3 - 20), this.w/this.windows*1.5);
        }
    }
};
timer.prototype.display = function(){
    //f = createFont("fantasy", 40);
    //textFont(f);
    fill(255, 255, 255);
    textSize(32);
    this.currentTime += millis()-this.zero;
    this.zero = millis();
    text(floor((this.currentTime)/1000), 200,50);
};
bullet.prototype.display = function(){
    if(this.vis === 1){
        
        if(sundae > 0 && sundae < 50){
            noStroke();
                fill(0, 255, 200, 100);
                ellipse(this.x+5, this.y+1.5, 15, 15);
            
        }
        fill(this.c1, this.c2, this.c3);
        noStroke();
        //stroke(0, 0, 0);
        rect(this.x, this.y, 10,3, 1);
        stroke(0, 0, 0);
    }
};
starObj.prototype.display = function() {
    fill(255, 242, 0);
    stroke(255, 255, 0);
    if(lightBallDraw > 9){
    image(pikaLight[floor(this.frame/3)], this.x, this.y, 40, 40);}
};
truckObj.prototype.display = function() {
    if(hitBox.inv ===  1){
        dispTrk++;
        if(dispTrk > 15){
            dispTrk = 0;
        }
    }
    else{
        dispTrk = 0;
    }
    //sho the power up if the sundae is active
    if(keys.o && keys.i){
        sundae = 49;
    }
    if(sundae > 0 && sundae < 50){
        image(pikaBalloons[20], this.x-140, this.y-220, 400, 400);
    }
    if(setupDone){
        if(dispTrk < 10){
            image(pikaBalloons[22], this.x-50, this.y-150, 200, 200);
        }
        
    }
    
};
enemy.prototype.display = function() {
    if(this.frame < 15){
    image(pikaBalloons[this.frame], this.x, this.y, 200, 200);
    
        if(this.laser > 0 && this.laserActive){
            image(pikaBalloons[15], this.x, this.y, 200, 200);
        }
        if(this.laser > 1 && this.laserActive){
            image(pikaBalloons[15], this.x, this.y, 200, 200);
        }
        if(this.laser > 2 && this.laserActive) {
            image(pikaBalloons[15], this.x, this.y, 200, 200);
        }
        if(this.laser > 3 && this.laserActive){
            fill(255, 0, 0);
            noStroke();
            rect(this.x+43, this.y+114, -350, 3);
            rect(this.x+24, this.y+118, -350, 3);
            fill(255, 255, 255, 200);
            rect(this.x+43, this.y+115, -350, 1);
            rect(this.x+24, this.y+119, -350, 1);
        }
    }
    
    
    
};
bananaObj.prototype.display = function() {
    if (!this.collected) {
        image(pikaBalloons[17], this.x, this.y, 50, 50);
    } 
};
cherryObj.prototype.display = function() {
    if (!this.collected) {
        image(pikaBalloons[19], this.x, this.y, 40, 40);
    } 
};
newLifeObj.prototype.display = function() {
    if (!this.collected) {
        image(pikaBalloons[21], this.x, this.y, 80, 40);
    } 
};


//Star draw function
starObj.prototype.draw = function() {
    this.move();
    this.display();
};
//Move Functions
bullet.prototype.move = function(){
    this.x += 7;
    if(this.x > 450){
        this.shot = 0;
        this.vis = 1;
    }
};
building.prototype.move = function(){
    this.x -= this.s;
    if(this.x < -200){
        this.x = 420;  
        this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.w = random(9,12)*10;
    }
};
starObj.prototype.move = function(){
    this.frame++;
    if(this.frame > 19){this.frame = 0;}
    this.x -= this.speed;  
    this.y += (this.period)*sin(radians(millis()/this.period));
    if(this.x < -30){
        this.vis = 0;
        this.x = this.initx;
        this.y = random(0, 400);
        this.period = random(2,6);
    }
};
truckObj.prototype.moveRight = function() {
    if(this.x >= -765){
        this.x -= this.speed;
        hitBox.x += this.speed/2;
    }
};
truckObj.prototype.moveLeft = function() {
    if(this.x <= -130){
        this.x += this.speed;
        hitBox.x -= this.speed/2;
    }
};
truckObj.prototype.moveUp = function() {
    if(this.y >= 120){
        this.y -= this.speed;
        hitBox.y -= this.speed/2;
    }
};
truckObj.prototype.moveDown = function() {
    if(this.y <= 775){
        this.y += this.speed;
        hitBox.y += this.speed/2;
    }
};
enemy.prototype.move = function() {
    this.y = 200;
    this.x --;
    if(this.x < -200) {this.x = 400; this.frame++;}
};
enemy.prototype.gameMove = function(){
    this.y += this.dir;
    if(this.y > 200){
        this.dir = -1;
    }
    if(this.y < 0){
        this.dir = 1;
    }
};
bananaObj.prototype.move = function() {
    this.x -= 1;
    this.y += random(-1, 1);
    if(this.x < -100 && !this.collected){
        this.x = random(500, 800);
        this.y = random(50, 350);
    }
};
cherryObj.prototype.move = function() {
    if (bananaPowUp){
    this.x -= 1;
    this.y += random(-1, 1);
    if(this.x < -100 && !this.collected){
        this.x = random(500, 800);
        this.y = random(50, 350);
    }
    }
};
newLifeObj.prototype.move = function() {
    if(this.collected){
        this.collected = 0;
        this.x = -1000;
    }
    if(newLivesEnabled){
    this.x -= 1;
    }
    this.y += random(-1, 1);
    if(this.x < -100){
        this.x = random(800, 1200);
        this.y = random(50, 350);
    
    }
};


//Variable initialization
for(var i = 0; i < 30; i++){
    bullets.push(new bullet());
}
for(var i = 0; i < 10; i++){
    buildings.push(new building(random(0,400), random(100,300), i/4+0.5));
}
for(var i = 0; i < 5; i++){
    fill(255, 221, 0);
    stroke(255, 221, 0);
    stars.push(new starObj(random(410, 800), random(0,400), random(1,2), random(2,3)));
}
trucks.push(new truckObj(-126, 300, 8));
myTimer = new timer(millis());
hitBox = new truckHitBox(0, 110, 70);
var pikachuEnemy = new enemy(400, 200, 0);
var bananaPow = new bananaObj(random(500, 800), random(50, 350));
var cherryPow = new cherryObj(random(500, 800), random(50, 350));
var newLife = new newLifeObj(random(800, 1200), random(50, 350));
var fruitReset = function() {

    cherryPowUp = 0;
    bananaPowUp = 0;
    bananaPow.collected = 0;
    cherryPow.collected = 0;
    bananaPow.x = random(500, 800);
    bananaPow.y = random(50, 350);
    cherryPow.x = random(500, 800);
    cherryPow.y = random(50, 350);
    sundae = 0;
};

//Timer play function
timer.prototype.play = function(){
    this.zero = millis();
};


//reset game function
var reset = function(){
    trucks[0] = new truckObj(-126, 300, 8);
    hitBox = new truckHitBox(0, 110, 70);
    stars = [];
    bullets = [];
    lost = 0;
    menuSelect='play';
    fruitReset();
    newLife.x = random(800, 1200);
    newLife.y = random(50, 350);
    cloudStart = 0;
    cloudSize = 0;
    pikachuEnemy.laser = 0;
    myTimer = new timer(millis());
    for(var i = 0; i < 5; i++){
        fill(255, 221, 0);
        stroke(255, 221, 0);
        stars.push(new starObj(random(410, 800), random(0,400), random(1,2), random(2,3)));
    }
    for(var i = 0; i < 30; i++){
    bullets.push(new bullet());
    }
};


//Collision detection functions
truckHitBox.prototype.collisions = function(){
    //only check for collisions if the power up is not active
    if(!invincible){
    if(this.inv === 0){ 
        if(this.x + this.w > pikachuEnemy.x + 15 && this.x < pikachuEnemy.x + 200 && this.y + this.h > pikachuEnemy.y && this.y + 15 < pikachuEnemy.y + 185){
            trucks[0].lives += -1;
            this.inv = 1;
        }
        if(pikachuEnemy.laser === 4 && pikachuEnemy.laserActive){
            if(this.y + this.h > pikachuEnemy.y + 114 && this.y < pikachuEnemy.y + 118){
                trucks[0].lives += -1;
                this.inv = 1;
            }
        }
        for(var i = 0; i < stars.length; i++){
            if(stars[i].x > this.x && stars[i].x < this.x + this.w && stars[i].y > this.y && stars[i].y < this.y + this.h){
                trucks[0].lives += -1;
                this.inv = 1;
                stars[i].vis = 0;
                //reset();
            }
        }
        if(trucks[0].lives < 1 && playing === 1){
            
            text("You Lost!", 200, 200);
            endGameCounter++;
            lost = 1;
            if(endGameCounter > 200){
                playing = 0;
                lost = 0;
            trucks[0].lives = 3;
            GameState = 'menu';
            pikachuEnemy.frame = 0;
            endGameCounter = 0;
            }
            
            this.inv = 0;
        }
        
    }
    else{
        invCnt++;
        if(invCnt > 120){
            invCnt = 0;
            this.inv = 0;
        }
    }
    }
};

var redEye = function() {
	background(0, 0, 0, 0);
	noStroke();
    var pp10 = [];
    pp10.push(new PVector(50, 225));
pp10.push(new PVector(55, 240));
pp10.push(new PVector(45, 250));
pp10.push(new PVector(40, 240));
subdivide(pp10, PP6);
subdivide(pp10, PP6);
subdivide(pp10, PP6);
    shapez(pp10, 255, 0, 0, 100);
ellipse(85, 230, 15, 15);
    fill(255, 0, 0, 150);
     
ellipse(49, 235, 7, 7);
ellipse(82, 227, 7, 7);
pikaBalloons.push(get(0,0,width,height));
balloonCount++;
};
var drawLight = function() {
    noStroke();
    background(0, 0, 0, 0);
    fill(250, 247, 180);
    ellipse(200, 200, 100, 100);
    for(var i = 0; i < 250; i++){
    pushMatrix();
    translate(200, 200);
    rotate(PI*i*random(0.1, 1)/20);
    fill(101, 59, 255);
    triangle(-10, random(-45, -1), 10, -45, 0, random(-150, -50));
    fill(252, 252, 219, 200);
    triangle(-10, random(-24, -44), 10, -44, 0, random(-100, -50));
    fill(255, 243, 8, 220);
    triangle(-10, -14, 10, -44, 0, random(-130, -50));
    popMatrix();
    }
    //angleMode = "degrees";
    
    pikaLight.push(get(0,0,width,height));
    
};

bullet.prototype.collision = function(){
    var hpBlockCount = pikachuEnemy.starthp/pikachuEnemy.difficulty - 1;
    if(this.x <= pikachuEnemy.x + 180 && this.x >= pikachuEnemy.x + 40 && this.y <= pikachuEnemy.y + 180 && this.y >= pikachuEnemy.y + 20){
        pikachuEnemy.curHp--;
        pikachuEnemy.hp++;
        if(pikachuEnemy.hp >= hpBlockCount){
            pikachuEnemy.frame += 1;
            pikachuEnemy.hp = 0;
        }
        this.vis = 0;
        if(pikachuEnemy.curHp <= 0 && !lost){
            playing = 0;
            text("You Won!", 200, 200);
            endGameCounter++;
            if(endGameCounter > 200){
                
            trucks[0].lives = 3;
            GameState = 'menu';
            pikachuEnemy.frame = 0;
            endGameCounter = 0;
            }
            hitBox.inv = 0;
        }
    }
};
var randomStarAtk = random(60, 90);
var frameCnt = 0;
var myi = 0;

var cloud = function() {
    noStroke();
    
    cloudSize += 0.1;
    if(cloudSize < 10){
    
        fill(15*(10-cloudSize), 15*(10-cloudSize), 15*(10-cloudSize), 100);
        
        for (var i = -10; i < 10; i ++) {
            ellipse(120+(i*cloudSize), 0, 50, 50);
        }
    }
    else {
        fill(250, 250, 250);
        if(cloudSize > 15 && cloudSize < 20){
            if(hitBox.inv === 0){
                if(hitBox.x + hitBox.w > 40 && hitBox.x < 50 && !invincible){
                    trucks[0].lives--;
                    hitBox.inv = 1;
                    
                }
            }
            rect(40, 10, 10, 400);
            fill(255, 251, 43, 200);
            rect(42, 10, 6, 400);
            for(var k = 0; k < 40; k++){
                fill(255, 251, 43);
                quad(40-random(0, 10), 10+10*k, 45, 10+10*k-random(-10+10), 50+random(0, 10), 10+10*k, 45, 10+10*k+random(-10, 10));
                fill(252, 244, 138);
                quad(40-random(0, 5), 10+10*k, 45, 10+10*k+random(-10, 10), 50+random(0, 5), 10+10*k, 45, 10+10*k+random(-10, 10));
            }
        }
        if(cloudSize > 20 && cloudSize < 25){
            if(hitBox.inv === 0){
                if(hitBox.x + hitBox.w > 140 + 40 && hitBox.x < 140 + 50 && !invincible){
                    trucks[0].lives--;
                    hitBox.inv = 1;
                }
            }
            rect(140+40, 10, 10, 400);
            fill(255, 251, 43, 200);
            rect(140+42, 10, 6, 400);
            for(var k = 0; k < 40; k++){
                fill(255, 251, 43);
                quad(180-random(0, 10), 10+10*k, 185, 10+10*k+random(-10, 10), 190+random(0, 10), 10+10*k, 185, 10+10*k+random(-10, 10));
                fill(252, 244, 138);
                quad(180-random(0, 5), 10+10*k, 185, 10+10*k+random(-10, 10), 190+random(0, 5), 10+10*k, 185, 10+10*k+random(-10, 10));
            }
        }
        if(cloudSize > 25){
            if(hitBox.inv === 0){
                if(hitBox.x + hitBox.w > 110 && hitBox.x < 120 && !invincible){
                    trucks[0].lives--;
                    hitBox.inv = 1;
                }
            }
            rect(110, 10, 10, 400);
            fill(255, 251, 43, 200);
            rect(112, 10, 6, 400);
            for(var k = 0; k < 40; k++){
                fill(255, 251, 43);
                quad(110-random(0, 10), 10+10*k,115, 10+10*k+random(-10, 10), 120+random(0, 10), 10+10*k, 115, 10+10*k+random(-10, 10));
                fill(252, 244, 138);
                quad(110-random(0, 5), 10+10*k, 115, 10+10*k+random(-10, 10),120+random(0, 5), 10+10*k, 115, 10+10*k+random(-10, 10));
            }
        }
        if(cloudSize > 30){
            cloudStart = 0;
            cloudSize = 0;
        }
        
        fill(50, 50, 50);
        for (var i = -10; i < 10; i ++) {
            ellipse(120+(i*10), 0, 50, 50);
        }
        fill(255, 251, 43);
        var tx = random(10, 210);
        var ty = random(10, 15);
        triangle(tx+random(-10, 10), ty+random(-10, 10),tx+random(-10, 10), ty+random(-10, 10),tx+random(-10, 10), ty+random(-10, 10));
        
       
    }
    
    
    
};

var CPressed = 0;
var waitLaser = 60;
var laserCnt = 0;
var laser1Cnt = 0;
var laser2Cnt = 0;
var laser3Cnt = 0;
var laser4Cnt = 0;

//Main draw function contains most of the logic and state machines
draw = function() {
    
    
    if(lightBallDraw < 10){
                drawLight();
                lightBallDraw++;
            }
    if(balloonCount < 15) {
        background(0, 0, 0, 0);
        balloons();
        pika2();
        
        pikaBalloons.push(get(0,0,width,height));
        balloonCount++;
    }
    else if(balloonCount === 15){
        balloonCount++;
        redEye();
        noStroke();
        background(0, 0, 0, 0);
        shapez(banana, 157, 157, 157, 200);
        pikaBalloons.push(get(0,0,width,height));
        shapez(banana, 255, 255, 0, 255);
        pikaBalloons.push(get(0,0,width,height));
        background(0, 0, 0, 0);
        shapez(cherry, 157, 157, 157, 200);
        pikaBalloons.push(get(0,0,width, height));
        shapez(cherry, 255, 50, 50, 255);
        pikaBalloons.push(get(0,0,width, height));
        background(0, 0, 0, 0);
        
       
    for(var i = 0; i < 256; i++){
    
        fill(0, 255, 255-i, 5);
        ellipse(200, 200, 255-i, 255-i);
    }
    pikaBalloons.push(get(0, 0, width, height));
         
        makeTruck();
        setupDone = 1;
    }
    else{
        
        background(0, 0, 0, 0);
    pikaPoints = []; pP2 = [];
    pp2 = []; PP2 = [];
    pp3 = []; PP3 = [];
    pp4 = []; PP4 = []; pp5 = []; PP5 = [];
    pp55 = []; PP55 = [];
    pp6 = []; PP6 = [];
    banana = [];
    cherry = [];
    }
    
    if(sundae > 0 && sundae < 50) {
        sundae -=1/6;
        invincible = 1;
    }
    else if(sundae < 0){
        fruitReset();
        invincible = 0;
    }
    
    
    if(!keys[ENTER] && !keys[RETURN]){
        enterStill = 0;    
    }
    
    //State machine for major parts of game
    switch(GameState){
        //Menu case
        case 'menu':
            var menu = function() {
            background(90, 90, 153);
            
            //f = createFont("fantasy", 50);
            //textFont(f);
            textSize(120);
            fill(245, 0, 143);
            text("Ryan's Big Adventure", scrollingTitle, 120);            
            text("Ryan's Big Adventure", scrollingTitle2, 120);
            scrollingTitle-=1.5;
            scrollingTitle2 -=1.5;
            if(scrollingTitle < -1200) {
                scrollingTitle = 1200;}
            if(scrollingTitle2 < -1200) {
                scrollingTitle2 = 1200;
            }
            
            trucks[0].x = 150;
            trucks[0].y = 125;
            trucks[0].display();
            
            if(balloonCount > 15){
                pikachuEnemy.display();
                pikachuEnemy.move();
                
               
            }
            
            textSize(50);
            for(var i = 0; i < stars.length; i++){
                stars[i].draw();
            }
            if(menuSelect === 'play'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'credits';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'instructions'; 
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('PLAY', 140,200);
            if(menuSelect === 'instructions'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'play';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'credits';  
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('INSTRUCTIONS', 20, 250);
            if(menuSelect === 'credits'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'instructions';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'play';  
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('CREDITS', 85, 300);
            };
            menu();
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                enterStill = 1;
                switch(menuSelect){
                    case 'play':
                        GameState = 'difficulty';
                        menuSelect = 'easy';
                        break;
                    case 'instructions':
                        GameState = 'instructions';
                        break;
                    case 'credits':
                        GameState = 'faq';
                        break;
                }
            }
            
            break;
            
        //Difficulty Case
        case 'difficulty':
            background(94, 92, 161);
            fill(94, 92, 161);
            rect(50,50,300,300);
            fill(0, 0, 0);
            //f = createFont("fantasy", 60);
            //textFont(f);
            if(menuSelect === 'easy'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'hard';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'medium'; 
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('EASY', 140,150);
            if(menuSelect === 'medium'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'easy';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'hard';  
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('MEDIUM', 100, 200);
            if(menuSelect === 'hard'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'medium';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'easy';  
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('HARD', 135, 250);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                enterStill = 1;
                switch(menuSelect){
                    case 'easy':
                        GameState = 'play';
                        playing = 1;
                        reset();
                        pikachuEnemy.frame = 0;
                        pikachuEnemy.starthp = 2000;
                        pikachuEnemy.curHp = 2000;
                        pikachuEnemy.x = 270;
                        pikachuEnemy.y = 100;
                        trucks[0] = (new truckObj(-126, 300, 8));
                        newLivesEnabled = 1;
                        break;
                    case 'medium':
                        GameState = 'play';
                        playing = 1;
                        reset();
                        pikachuEnemy.frame = 0;
                        pikachuEnemy.starthp = 4000;
                        pikachuEnemy.curHp = 4000;
                        pikachuEnemy.x = 270;
                        pikachuEnemy.y = 100;
                        trucks[0] = (new truckObj(-126, 300, 8));
                        newLivesEnabled = 1;
                        break;
                    case 'hard':
                        GameState = 'play';
                        playing = 1;
                        reset();
                        pikachuEnemy.frame = 0;
                        pikachuEnemy.starthp = 4000;
                        pikachuEnemy.curHp = 4000;
                        pikachuEnemy.x = 270;
                        pikachuEnemy.y = 100;
                        trucks[0] = (new truckObj(-126, 300, 8));
                        newLivesEnabled = 0;
                        break;
                }
            }
            break;
        //FAQ or help case
        case 'faq':
            background(255, 255, 255);
            fill(0, 0, 0);
            //f = createFont("fantasy", 20);
            //textFont(f);
            textSize(18);
            text('By: Logan Eisenbeiser and Andrew Gamma', 5, 25);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                enterStill = 1;
                GameState = 'menu';
            }
            break;
        
        //Pause case    
        case 'pause':
            background(94, 92, 161);
            var pause = function() {
            fill(94, 92, 161);
            rect(50,50,300,300);
            fill(0, 0, 0);
            //f = createFont("fantasy", 60);
            //textFont(f);
            if(menuSelect === 'play'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'exit';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'instructions'; 
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            textSize(50);
            text('PLAY', 145,150);
            if(menuSelect === 'instructions'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'play';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'exit';  
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('HELP', 142, 200);
            if(menuSelect === 'exit'){
                if(!upStill && !downStill){
                    if(keys[UP]){
                        menuSelect = 'instructions';
                        upStill = 1;
                    }
                    if(keys[DOWN]){
                        menuSelect = 'play';  
                        downStill = 1;
                    }
                }
                if(!keys[UP]){
                    upStill = 0;
                }
                if(!keys[DOWN]){
                    downStill = 0;
                }
                fill(0, 255, 81);
            }
            else{
                fill(255, 255, 0);
            }
            text('EXIT', 145, 250);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                enterStill = 1;
                switch(menuSelect){
                    case 'play':
                        GameState = 'play';
                        myTimer.play();
                        //trucks[0] = (new truckObj(-126, 300, 8));
                        break;
                    case 'instructions':
                        GameState = 'instructions';
                        break;
                    case 'exit':
                        playing = 0;
                        GameState = 'menu';
                        menuSelect = 'play'; 
                        hitBox.inv = 0;
                        break;
                }
            }
            };
            pause();
            break;
            
        //Play case
        case 'play':
            frameCnt++;
            cloudCount++;
            laserCnt++;
            if(keys.p){
                GameState = 'pause';
                menuSelect = 'play';
            }
            if(keys.c && !CPressed) {
                constant = !constant;
                CPressed = 1;
            }
            if(keys.l && !CPressed) {
                pikachuEnemy.laser++;
                pikachuEnemy.laserActive = 1;
                if(pikachuEnemy.laser > 4){
                    pikachuEnemy.laser = 0;
                }
                CPressed = 1;
            }
            if(keys.w) {
                cloudStart = 1;
            }
            if(keys.x && sundae === 50 &&!lost) {
                sundae -= 1/7;
            }
            
            //draw background and buildings
            background(94, 92, 161);
            for(var i = 0; i < buildings.length; i++){
                buildings[i].move();
                buildings[i].display();
            }
            //draw empty power ups
            pushMatrix();
            rotate(-PI/4);
            translate(160, 190);
            if(bananaPowUp){
                image(pikaBalloons[17], 50, 50, 50, 50);
            }
            else{
                image(pikaBalloons[16], 50, 50, 50, 50);}
            popMatrix();
            if(cherryPowUp){
                
                image(pikaBalloons[19], 335, -10, 40, 40);
            }
            else{
            image(pikaBalloons[18], 335, -10, 40, 40);}
            
            bananaPow.move();
            bananaPow.display();
            cherryPow.move();
            cherryPow.display();
            newLife.move();
            newLife.display();
            
            //bar to show power up
            noStroke();
            fill(157, 157, 157, 200);
            rect(223, 13, 104, 14, 5);
            
            fill(0, 255, 128);
            rect(225, 15, sundae*2, 10, 5);
            
            
            pikachuEnemy.display();
            pikachuEnemy.gameMove();
            //myTimer.display();
            hitBox.display();
            if(frameCnt > randomStarAtk){
                randomStarAtk = random(90, 120);
                frameCnt = 0;
                stars[myi].vis = 1;
                stars[myi].x = pikachuEnemy.x;
                stars[myi].y = pikachuEnemy.y + 100;
                myi++;
                if(myi > (stars.length - 1)){
                    myi = 0;
                }
            }
            for(var i = 0; i < stars.length; i++){
                if(stars[i].vis === 1){
                    stars[i].draw();
                }
                if(stars[i].vis === 0){
                    stars[i].x = -200;
                }
            }
            if(pikachuEnemy.curHp < pikachuEnemy.starthp*0.45){
                if(cloudCount % 480 === 0){
                    cloudStart = 1;
                }
               //TODO: add in the thunder cloud
            }
            if(pikachuEnemy.curHp < pikachuEnemy.starthp*0.75){
                if(waitLaser < laserCnt){
                    pikachuEnemy.laser = 1;
                    pikachuEnemy.laserActive = 1;
                    laser1Cnt++;
                    if(laser1Cnt > 10){
                        pikachuEnemy.laser = 2;
                        laser2Cnt++;
                        if(laser2Cnt > 10){
                            pikachuEnemy.laser = 3;
                            laser3Cnt++;
                            if(laser3Cnt > 10){
                                pikachuEnemy.laser = 4;
                                laser4Cnt++;
                                if(laser4Cnt > 120){
                                    laserCnt = 0;
                                    laser1Cnt = 0;
                                    laser2Cnt = 0;
                                    laser3Cnt = 0;
                                    laser4Cnt = 0;
                                    waitLaser = random(120,240);
                                    pikachuEnemy.laser = 0;
                                    pikachuEnemy.laserActive = 0;
                                }
                            }
                        }
                    }
                }
            }
            pushMatrix();
            
            FrameCount++;
            for(var i = 0; i < bullets.length; i++){
                if(bullets[i].shot){
                    bullets[i].move();
                    bullets[i].collision();
                    bullets[i].display();
                }
            }
            
            //check power up collisions
            if(bananaPow.x < hitBox.x + hitBox.w/2 && bananaPow.x > hitBox.x - hitBox.w/2 && bananaPow.y < hitBox.y + hitBox.h/2 && bananaPow.y > hitBox.y - hitBox.h/2){
                bananaPowUp = 1;
                bananaPow.collected = 1;
            }
            else if(cherryPow.x < hitBox.x + hitBox.w/2 && cherryPow.x > hitBox.x - hitBox.w/2 && cherryPow.y < hitBox.y + hitBox.h/2 && cherryPow.y > hitBox.y - hitBox.h/2){
                cherryPowUp = 1;
                if(!cherryPow.collected){
                sundae = 50;
                cherryPow.collected = 1;}
                
            }
            if(newLife.x < hitBox.x + hitBox.w/2 && newLife.x > hitBox.x - hitBox.w/2 && newLife.y < hitBox.y + hitBox.h/2 && newLife.y > hitBox.y - hitBox.h/2){
                trucks[0].lives ++;
                newLife.collected = 1;
            }
            
            
            if(keys[UP]&&!lost){
                trucks[0].moveUp();
            }
            if(keys[RIGHT]&&!lost){
                trucks[0].moveRight();
            }
            if(keys[LEFT]&&!lost){
                trucks[0].moveLeft();
            }
            if(keys[DOWN]&&!lost){
                trucks[0].moveDown();   
            }
            //Delete the first half of the following statement for continuous bullets 
            if(((keys[' ']&&!constant)||constant) && FrameCount&1000){
                bullets[curBullet].x = hitBox.x + hitBox.w;
                bullets[curBullet].y = hitBox.y;
                bullets[curBullet].shot = 1;
                curBullet++;
                if(curBullet > 29){
                    curBullet = 0;
                }
                FrameCount = 0;
            }
            
            if(cloudStart){
                cloud();
            }
            scale(-0.5,0.5);
            trucks[0].display();
            popMatrix();
            hitBox.collisions();
            fill(255, 255, 255);
            if(trucks[0].lives >=0){
            text(trucks[0].lives, 20,380);
            }
            //f = createFont("fantasy", 40);
            //textFont(f);
            //text(pikachuEnemy.curHp, 200,380);
            //text(pikachuEnemy.starthp, 300,380);
            break;
        
        //Instructions case
        case 'instructions':
            background(255, 255, 255);
            fill(0, 0, 0);
            //f = createFont("fantasy", 20);
            //textFont(f);
            textSize(18);
            text('Instructions (press enter to return) \n \n \t Use the arrow keys to fly the ice cream truck. \n \t Defeat the giant pikachu by popping \n \t the balloons with your sprinkles. \n \n \t Watch out for the pikachu\'s attacks!  \n\n\t Press the space bar to shoot sprinkles, and use \n\t \'c\' to toggle auto firing. Press \'p\' to pause. \n\n\t Collect extra ice cream cones to gain lives, and \n\t collect the banana and cherry to activate \n\t SUNDAE MODE!! In sundae mode, press \'x\' to \n\t become invincible for a short time! \n\n\t Now go save the city!', 5, 25);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                if(!playing){
                    enterStill = 1;
                    GameState = 'menu';
                }
                else{
                    enterStill = 1;
                    myTimer.play();
                    GameState = 'pause';
                }
            }
            break;
    }
    
    
};


//Key detection
keyPressed = function() {
    keys[keyCode] = 1;
    keys[key] = 1;
};
keyReleased = function() {
    keys[keyCode] = 0;
    keys[key] = 0;
    CPressed = 0;
};





}};
