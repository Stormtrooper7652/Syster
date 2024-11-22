import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import express from "express";
import { getUser } from "../db/database.js";

/** @type {Server<IncomingMessage, ServerResponse>} server */
export var server = undefined


export async function initWebhook(key, port, ip) {
    const adress = ip ?? 'localhost'
    const app = express();

    app.get("/webhook", async (req, res) => res.sendStatus(await (async () => {
        const query = req.query;
        if (query.key !== key) {
            console.warn(`Invaild request [${req.headers.host}]`)
            return 403
        }

        const id = query.uid 
        const user = await getUser(id)

        if (user === null) {
            console.warn(`Invalid request id [${req.headers.host}]`)
            return 400
        }

        const amount = query.amount
        console.log(amount)
        if (!isNaN(amount)) {
            console.warn(`Invalid request amount [${req.headers.host}]`)
            return 400
        }

        user.balance += parseInt(amount)
        user.save()

        return 200
    })()));

    server = createServer(app);

    server.listen(port, adress, () => {
        console.log(`Webhook opened on { http://${adress}:${port} }`);
    });

    await new Promise((resolve) => server.on('listening', resolve));
}
