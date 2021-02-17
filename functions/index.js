const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const { domain } = require('./config.json');
const app = express();



app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))


admin.initializeApp(functions.config().firebase);



async function checkRoom(room) {
    let roomRef = admin.database().ref("Rooms");
    return roomRef.once("value").then(snap => {

        return snap.child(room).exists();
    })
}


async function putData() {
    let db = admin.database();
    let ref = db.ref("Rooms");

    let newRoomRef = ref.push();
    newRoomRef.set({
        participants: 1         //dummy value
    });

    console.log("Data Inserted");
    return newRoomRef.key;
}

// For Creating Room
app.post('/put_data', async (req, res) => {

    console.log("Inserting Data");
    let insert = await putData();
    console.log("Inserting: " + insert);
    res.json({ roomURL: domain + "room/" + insert });
});

// For getting index page
app.get('/', async (request, response) => {

    response.render('index');

});

//For getting Room Page
app.get('/room/:id', async (req, res) => {

    let roomExists = await checkRoom(req.params.id);
    if (roomExists) {
        let id = req.params.id;
        res.render('room', { id });
    }
    else {
        let err = { message: 'Room Does not exist' };
        res.render('error', { err });
    }
});


exports.app = functions.https.onRequest(app);

