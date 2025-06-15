import express from "express";
import cros from "cors";
import { Server } from "socket.io";
import { createServer } from 'http'
import router from "./route";
import { ClientToServer, ServerToClient } from "./types";
import Socket_Init from "./socket";
import { PORT } from "./export";

const app = express()

const httpServer = createServer(app);

/**Middleware**/
app.use(cros());
app.use(express.json());
app.use('/v1', router);

const io = new Server<ClientToServer, ServerToClient>(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

Socket_Init(io);

httpServer.listen(PORT, () => {

    console.log(`Running at http://localhost:${PORT}`)

})