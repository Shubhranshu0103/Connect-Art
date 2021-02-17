//For Clearing the Artwork

$('#clearArt').on('click', clearArt);

function clearArt() {
    console.log('clearing art');
    pointsDB.remove();
    points = [];
}

//For Saving artwork
$('#saveArt').on('click', saveArt);

function saveArt() {
    console.log('saving Art');
    saveCanvas(window.prompt("Save as", `Connect_Art_${Date.now()}`));
}

//To Prevent Right Click Default behavior
document.getElementById('canvasContainer').addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);