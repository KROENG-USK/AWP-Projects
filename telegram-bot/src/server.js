// memanggil library telegram-bot
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
require("dotenv").config();

// // make uptimebot server
// const express = require("express");
// const app = express();

// let port = process.env.PORT || 3000;

// app.get("/", function (req, res){
//     res.send("Telegram-bot sudah online!");
// });

// app.listen(port, () => {
//     console.log(`Example app is listening on port http://localhost:${port}`);
// });

// mengambil token telegram bot
const TOKEN = process.env.TOKEN;

try {
    // membuat object server
    var opt = { polling: true };
    const server = new TelegramBot(TOKEN, opt);
    // memuat pesan perintah, beralih ke program events/message.js
    fs.readdir("./src/events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            server.on(eventName, event.bind(null, server));
        });
    });
} catch (error) {
    console.error(error);
}