var left = 0;
var right = 0;
var fontsize = 10;
var difference = 0;
function preload(){

}
function setup(){
    canvas = createCanvas(600, 600);
    canvas.position(650, 150);
    video = createCapture(VIDEO);
    video.position(20, 150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    background('#4287f5');
    fill('#c5aae6');
    textSize(fontsize);
    text('ABC', 40, 500);
}
function modelLoaded(){
    console.log('Model loaded');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        left = results[0].pose.leftWrist.x;
        right = results[0].pose.rightWrist.y;
        fontsize = difference;

        console.log('left wrist: ' + left);
        console.log('right wrist: ' + right);
        console.log('font size: ' + fontsize);

        if(left > right){
            difference = floor(left - right);
            console.log('difference: ' + difference);
            fontsize = difference;
        } else if(right < left){
            difference = floor(right - left);
            console.log('difference: ' + difference);
            fontsize = difference;
        }

        document.getElementById("fontsizestatus").innerHTML = "Font size: " + fontsize;
        draw();
    }
}