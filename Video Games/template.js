var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


angleMode = "radians";
//This program is a game in which an icecream truck flys to avoid obstacles
//By: Andrew Gamma

//TODO: Update the hit boxes for the stars (now 40x40) 
//TODO: modify the constant shooting to stop double toggling 

//Usage of the pikachu sprites: pikaBalloons[i] where 0 <= i < 15
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

//angleMode = "degrees";

//Variables
var bullets = [];
var f;
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

var balloonCount = 0;


var myTimer;
var hitBox;
var pikachuEnemy;
var GameState = 'menu';
var menuSelect = 'play';
var upStill = 0;
var downStill = 0;
var enterStill = 0;
var playing = 0;
var scrollingTitle = 400;
var scrollingTitle2 = 1500;


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
var shapez = function(points, c1, c2, c3) {
beginShape();
fill(c1, c2, c3);
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
shapez(pikaPoints, 250, 210, 34);
shapez(pp2, 0, 0, 0);
shapez(pp3, 0, 0, 0);
shapez(pp4, 255, 0, 0);
shapez(pp5, 84, 0, 0);
shapez(pp55, 250, 135, 214);
if(balloonCount < 14){
shapez(pp6, 0, 0, 0);
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

shapez(pointsBlue, 121, 171, 196);
shapez(pointsBlue2, 206, 248, 255);

if(balloonCount === 3){
puncture(40, 140, 206, 248, 255);}}
else {pointsBlue = []; pointsBlue2 = [];}
 
//GREY   
if(balloonCount < 6) {
fill(200, 214, 205);
ellipse(145, 120, 80, 80);
triangle(120, 151, 176, 145, 150, 180);

shapez(pointsGrey, 159, 168, 162);

if(balloonCount === 5) {
puncture(135, 135, 250, 264, 255);}}
else {pointsGrey = [];}

//PINK
if(balloonCount < 12) {
fill(238, 177, 202);
ellipse(90, 80, 100, 100);
triangle(60, 120, 124, 117, 95, 160);
quad(90, 155, 100, 155, 105, 162, 85, 162);

shapez(pointsPink, 207, 153, 176);
shapez(pointsPink2, 255, 216, 241);
if(balloonCount === 11){
puncture(80, 80, 255, 216, 241);}}
else{pointsPink = []; pointsPink2 = [];}

//PURPLE
if(balloonCount < 8){
fill(189, 163, 204);
ellipse(190, 120, 80, 80);
triangle(163, 150, 218, 149, 190, 180);
quad(185, 175, 195, 175, 200, 182, 180, 179);

shapez(pointsPur, 148, 135, 155);
if(balloonCount ===7) {
puncture(185, 140, 219, 193, 234);}}
else {pointsPur = [];}

//ORANGE
if(balloonCount < 2) {
fill(209, 153, 81);
ellipse(255, 165, 80, 80);
triangle(195+25, 133+50, 260+25, 137+55, 245, 170+55);
quad(185+55, 175+45, 195+55, 175+45, 200+55, 182+45, 180+55, 179+45);

shapez(pointsBrn, 172, 133, 84);
shapez(pointsBrn2, 248, 192, 119);

if(balloonCount === 1) {
puncture(260, 170, 248, 192, 119);
}}
else {pointsBrn = []; pointsBrn2 = [];}

//YELLOW
if(balloonCount < 10) {
fill(230, 233, 82);
ellipse(230, 100, 95, 95);
triangle(195, 133, 260, 137, 220, 170);

shapez(pointsYel2, 255, 255, 120);
shapez(pointsYel, 194, 190, 95);
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

shapez(pointsGreen, 128, 155, 96);
shapez(pointsGreen2, 193, 235, 114);
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
};
var bullet = function(){
    this.x = 0;
    this.y = 0;
    this.shot = 0;
    this.vis = 1;
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

var enemy = function(x, y, z){
    this.x = x;
    this.y = y;
    this.frame = z;
    this.starthp = 400;
    this.hp = 0;
    this.difficulty = 15;
    this.dir = 1;
};


//Object display functions
truckHitBox.prototype.display = function(){
    noFill();
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
    f = createFont("Calibri Bold", 40);
    textFont(f);
    fill(255, 255, 255);
    textSize(32);
    this.currentTime += millis()-this.zero;
    this.zero = millis();
    text(floor((this.currentTime)/1000), 200,50);
};
bullet.prototype.display = function(){
    if(this.vis === 1){
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
    // Ice Cream Truck with A as cone and E as service area
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
};
enemy.prototype.display = function() {
    if(this.frame < 15){
    image(pikaBalloons[this.frame], this.x, this.y, 200, 200);}
    
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
pikachuEnemy = new enemy(400, 200, 0);



//Timer play function
timer.prototype.play = function(){
    this.zero = millis();
};




//reset game function
var reset = function(){
    trucks[0] = new truckObj(-126, 300, 8);
    hitBox = new truckHitBox(0, 110, 70);
    stars = [];
    myTimer = new timer(millis());
    for(var i = 0; i < 5; i++){
        fill(255, 221, 0);
        stroke(255, 221, 0);
        stars.push(new starObj(random(410, 800), random(0,400), random(1,2), random(2,3)));
    }
};


//Collision detection functions
truckHitBox.prototype.collisions = function(){
    for(var i = 0; i < stars.length; i++){
        if(stars[i].x > this.x && stars[i].x < this.x + this.w && stars[i].y > this.y && stars[i].y < this.y + this.h){
            trucks[0].lives += -1;
            if(trucks[0].lives < 1){
                trucks[0].lives = 3;
                playing = 0;
                GameState = 'menu';
                pikachuEnemy.frame = 0;
            }
            stars[i].vis = 0;
            //reset();
        }
    }
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
    var hpBlockCount = pikachuEnemy.starthp/pikachuEnemy.difficulty;
    if(this.x <= pikachuEnemy.x + 180 && this.x >= pikachuEnemy.x + 40 && this.y <= pikachuEnemy.y + 180 && this.y >= pikachuEnemy.y + 20){
        pikachuEnemy.hp++;
        if(pikachuEnemy.hp >= hpBlockCount){
            pikachuEnemy.frame += 1;
            pikachuEnemy.hp = 0;
        }
        this.vis = 0;
    }
};
var randomStarAtk = random(60, 90);
var frameCnt = 0;
var myi = 0;
//Main draw function contains most of the logic and state machines
draw = function() {
    if(balloonCount < 15) {
        background(0, 0, 0, 0);
        balloons();
        pika2();
        
        pikaBalloons.push(get(0,0,width,height));
        balloonCount++;
    }
    else{
        background(0, 0, 0, 0);
    pikaPoints = []; pP2 = [];
    pp2 = []; PP2 = [];
    pp3 = []; PP3 = [];
    pp4 = []; PP4 = []; pp5 = []; PP5 = [];
    pp55 = []; PP55 = [];
    pp6 = []; PP6 = [];
    }
    
    if(!keys[ENTER] && !keys[RETURN]){
        enterStill = 0;    
    }
    //State machine for major parts of game
    switch(GameState){
        //Menu case
        case 'menu':
            if(lightBallDraw < 10){
                drawLight();
                lightBallDraw++;
            }
            background(90, 90, 153);
            
            f = createFont("Calibri Bold", 50);
            textFont(f);
            textSize(120);
            fill(245, 0, 143);
            text("Ryan's Big Adventure", scrollingTitle, 120);            
            text("Ryan's Big Adventure", scrollingTitle2, 120);

            scrollingTitle-=1.5;
            scrollingTitle2 -=1.5;
            if(scrollingTitle < -1100) {
                scrollingTitle = 1100;}
            if(scrollingTitle2 < -1100) {
                scrollingTitle2 = 1100;
            }
            
            trucks[0].x = 150;
            trucks[0].y = 125;
            trucks[0].display();
            
            if(balloonCount > 14){
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
            text('PLAY', 160,200);
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
            text('INSTRUCTIONS', 60, 250);
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
            text('CREDITS', 120, 300);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                enterStill = 1;
                switch(menuSelect){
                    case 'play':
                        GameState = 'play';
                        playing = 1;
                        reset();
                        pikachuEnemy.frame = 0;
                        pikachuEnemy.starthp = 2000;
                        pikachuEnemy.x = 270;
                        pikachuEnemy.y = 100;
                        trucks[0] = (new truckObj(-126, 300, 8));
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
            
        //FAQ or help case
        case 'faq':
            background(255, 255, 255);
            fill(0, 0, 0);
            f = createFont("Calibri Bold", 20);
            textFont(f);
            text('By: Logan Eisenbeiser and Andrew Gamma', 5, 25);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                enterStill = 1;
                GameState = 'menu';
            }
            break;
        
        //Pause case    
        case 'pause':
            fill(255, 255, 255);
            rect(50,50,300,300);
            fill(0, 0, 0);
            f = createFont("Calibri Bold", 60);
            textFont(f);
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
                        trucks[0] = (new truckObj(-126, 300, 8));
                        break;
                    case 'instructions':
                        GameState = 'instructions';
                        break;
                    case 'exit':
                        playing = 0;
                        GameState = 'menu';
                        menuSelect = 'play'; 
                        break;
                }
            }
            break;
            
        //Play case
        case 'play':
            frameCnt++;
            if(keys.p){
                GameState = 'pause';
            }
            if(keys.c) {
                constant = !constant;
            }
            background(94, 92, 161);
            for(var i = 0; i < buildings.length; i++){
                buildings[i].move();
                buildings[i].display();
            }
            
            pikachuEnemy.display();
            pikachuEnemy.gameMove();
            myTimer.display();
            hitBox.display();
            if(frameCnt > randomStarAtk){
                randomStarAtk = random(60, 90);
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
            pushMatrix();
            
            FrameCount++;
            for(var i = 0; i < bullets.length; i++){
                if(bullets[i].shot){
                    bullets[i].move();
                    bullets[i].collision();
                    bullets[i].display();
                }
            }
            if(keys[UP]){
                trucks[0].moveUp();
            }
            if(keys[RIGHT]){
                trucks[0].moveRight();
            }
            if(keys[LEFT]){
                trucks[0].moveLeft();
            }
            if(keys[DOWN]){
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
            scale(-0.5,0.5);
            trucks[0].display();
            popMatrix();
            hitBox.collisions();
            text(trucks[0].lives, 20,380);
            break;
        
        //Instructions case
        case 'instructions':
            background(255, 255, 255);
            fill(0, 0, 0);
            f = createFont("Calibri Bold", 20);
            textFont(f);
            text('-Instructions (press enter to return) \n \n \t use the arrow keys to fly the ice cream truck. \n \t defeat the giant pikachu by popping \n \t the balloons with your sprinkles. \n \n \t watch out for the pikachu\'s attacks!', 5, 25);
            if((keys[ENTER] || keys[RETURN]) && !enterStill){
                if(!playing){
                    enterStill = 1;
                    GameState = 'menu';
                }
                else{
                    enterStill = 1;
                    myTimer.play();
                    GameState = 'play';
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
};



}};
