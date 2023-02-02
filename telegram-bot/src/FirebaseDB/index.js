var admin = require("firebase-admin");
var serviceAccount = require("./FirebaseKeys/to/serviceAccount.json");
var https = require("./FirebaseKeys/https/index.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: https["https"]
});


const db = admin.database();

module.exports = db;