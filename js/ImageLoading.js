var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");


var trackPics = [];

var picsToLoad = 0;

function countLoadedImages() {
    picsToLoad --;
    if(picsToLoad == 0) {
        ImageLoadingDone();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImages();
    imgVar.src = fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName)
}

function loadImages(){

    var imageList = [
        {varName: carPic, theFile: "images/player1car.png"},
        {varName: otherCarPic, theFile: "images/player2car.png"},
        {trackType: TRACK_ROAD, theFile: "images/track_Road.png"},
        {trackType: TRACK_WALL, theFile: "images/track_Wall.png"},
        {trackType: TRACK_GOAL, theFile: "images/track_Goal.png"},
        {trackType: TRACK_TREE, theFile: "images/track_Tree.png"},
        {trackType: TRACK_FLAG, theFile: "images/track_Flag.png"}
    ];
    picsToLoad = imageList.length;

    for(var i = 0; i< imageList.length; i++) {
        if(imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile)
        }
    }
}