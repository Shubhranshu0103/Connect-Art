var firebaseConfig = {
    apiKey: "AIzaSyDC0TXB2A00wE7WWDhWdQ00Ut7Dd57___w",
    authDomain: "myfirebase-project-cc571.firebaseapp.com",
    databaseURL: "https://myfirebase-project-cc571-default-rtdb.firebaseio.com",
    projectId: "myfirebase-project-cc571",
    storageBucket: "myfirebase-project-cc571.appspot.com",
    messagingSenderId: "914397365030",
    appId: "1:914397365030:web:3182a9c3333378c8c2f7e7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let roomID = document.getElementById('roomID').textContent;
let pointsDB = firebase.database().ref(`Rooms/${roomID}/points`);
let points = [];        /**
                            Points Properties:
                                x : x coordinate of the point
                                y : y coordinate of the point
                                color : color of the pen
                                type : pentype, whether pen needs to draw or erase

                        */
let canvas;
let colorPicker;
let backGroundColor = 230;
let penWidth = 5;
let eraserWidth = 30;
const PEN_TYPE = {
    PEN_UP: "penUp",
    PEN_DOWN: "penDown"
};



function drawPoint() {

    let penType = mouseButton === LEFT ? PEN_TYPE.PEN_DOWN : PEN_TYPE.PEN_UP;
    pointsDB.push({
        x: mouseX,
        y: mouseY,
        color: colorPicker.color().levels,
        type: penType
    });
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint();
    }
}


function setup() {

    canvas = createCanvas(2 * windowWidth / 3, 2 * windowHeight / 3);
    canvas.parent('canvasContainer');
    background(backGroundColor);

    colorPicker = createColorPicker('#ed225d');
    colorPicker.parent('colorPicker');


    pointsDB.on('child_added', function (point) {
        points.push(point.val())
    });
    pointsDB.on('child_removed', function () {
        points = []
    });


    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(drawPointIfMousePressed);
}


function draw() {

    background(backGroundColor);
    for (let i = 0; i < points.length; i++) {

        strokeWeight(0);

        if (points[i].type == PEN_TYPE.PEN_DOWN) {
            let rgb = points[i].color;
            if (!rgb)
                fill('#000000');
            else
                fill(...rgb);
            circle(points[i].x, points[i].y, penWidth);
        }
        else {

            fill(backGroundColor);
            circle(points[i].x, points[i].y, eraserWidth);
        }

    }
}