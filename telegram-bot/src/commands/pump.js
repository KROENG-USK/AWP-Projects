/*
* Program mengaktifkan pompa air pada whatsapp-bot
* 
*/

const db = require("../FirebaseDB");
const ref = require("../FirebaseDB/path/reference.json");
const { getMessage } = require("../model");

exports.run = async (client, message) => {
    try {
        let cmd = await message.text.toLowerCase();
        let id = await message.from.id;

        getMessage((data) => {
            Object.keys(data).map(async (key) => {
                if (cmd === await data[key].q) {
                    db.ref(ref["ref-2"]).once("value", async (snapshot) => {
                        if (snapshot.val() !== null) {
                            var status = await snapshot.val();

                            if (cmd === "auto pump off" && cmd === data[key].q) {
                                db.ref(ref['ref-2']).child('auto').set(false);
                                db.ref(ref['ref-2']).child('switch-1').set(false);
                                db.ref(ref['ref-2']).child('switch-2').set(false);
                                return client.sendMessage(id, data[key].a);
                            }

                            if (status["auto"] !== true) {
                                if (cmd === "all pump on" && cmd === data[key].q) {
                                    db.ref(ref["ref-2"]).child("switch-1").set(true);
                                    db.ref(ref["ref-2"]).child("switch-2").set(true);
                                }

                                if (cmd === "all pump off" && cmd === data[key].q) {
                                    db.ref(ref["ref-2"]).child("switch-1").set(false);
                                    db.ref(ref["ref-2"]).child("switch-2").set(false);
                                }

                                if (cmd === "pump 1 on" && cmd === data[key].q) {
                                    db.ref(ref["ref-2"]).child("switch-1").set(true)
                                }

                                if (cmd === "pump 1 off" && cmd === data[key].q) {
                                    db.ref(ref["ref-2"]).child("switch-1").set(false)
                                }

                                if (cmd === "pump 2 on" && cmd === data[key].q) {
                                    db.ref(ref["ref-2"]).child("switch-2").set(true)
                                }

                                if (cmd === "pump 2 off" && cmd === data[key].q) {
                                    db.ref(ref["ref-2"]).child("switch-2").set(false)
                                }

                                if (cmd === "auto pump on" && cmd === data[key].q) {
                                    db.ref(ref['ref-2']).child('auto').set(true);
                                    db.ref(ref['ref-2']).child('switch-1').set(false);
                                    db.ref(ref['ref-2']).child('switch-2').set(false);
                                    return client.sendMessage(id, data[key].a);
                                }

                                else {
                                    client.sendMessage(id, `${data[key].a}`);
                                }

                            } else {
                                client.sendMessage(id, "Auto Pump sedang menyala, silahkan di non-aktifkan terlebih dahulu (auto pump off)")
                            }

                        } else;
                    });

                } else;
            });
        });

    } catch (e) {
        console.error(e);
    }
}