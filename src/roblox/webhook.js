import { createServer, Server } from "https";
import { readFileSync } from "fs";
import express from "express";
const __dirname = import.meta.dirname
/** @type {Server} server */
export var server = undefined

export async function initWebhook(port) {
    const app = express();

    app.post("/msg", function (req, res) {

        console.log(req.body);
    
        res.statusCode = 69
    });
    const options = {
        key: readFileSync(__dirname + "/../../ssl/server.key"),
        cert: readFileSync(__dirname + "/../../ssl/server.cert"),
    };    
    server = createServer(options, app)

    server.listen(port, (req, res) => {
        console.log("Webhook server open on port " + port);
    });

    await new Promise(res => server.on('listening', res))
}

