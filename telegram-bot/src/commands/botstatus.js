/*
* Program menampilkan informasi server ke client melalui aplikasi whatsapp
* 
*/

const { platform, arch, cpus } = require('os');
const model = cpus()[0].model + " " + arch();
const { clock } = require("../model");

exports.run = (client, message) => {
    let id = message.from.id;
    var information = `\t**System Information**\n\nNama : AWP Telegram-Bot V2.5 \n\nTanggal : ${ clock() }\nCPU : ${ model }\nPlatform : ${ platform }\nStatus : Online\n`;

    client.sendMessage(id, information);
}