import { createServer, Server } from "http";
import { readFileSync } from "fs";
import express from "express";
const __dirname = import.meta.dirname
/** @type {Server} server */
export var server = undefined


export async function initWebhook(port) {
    const app = express();

    app.get("/webhook", async (req, res) => {
        const query = req.query;
        console.log(query);

        res.sendStatus(200);
    });

    const server = createServer(app);

    server.listen(port, 'localhost', () => {
        console.log(`Server listening on http://localhost:${port}`);
    });

    await new Promise((resolve) => server.on('listening', resolve));
}
