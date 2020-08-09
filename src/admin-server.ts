import WebSocket = require('ws');
import https = require('https');
import http = require('http');
import fs = require('fs');

import { v4 } from 'uuid';
import { SocketEnums } from './server-enums';

export class AdminServer {
    private adminServerSocket: WebSocket.Server;

    private adminServer: https.Server | http.Server;
    private clients: { uuid: string, id: string, socket: WebSocket }[] = [];

    isDebug: boolean = false;
    port: number = 8443;

    constructor() {

        const server = this.isDebug ? http.createServer({}) : https.createServer({
            cert: fs.readFileSync('/etc/letsencrypt/live/itsatreee.com/fullchain.pem'),
            key: fs.readFileSync('/etc/letsencrypt/live/itsatreee.com/privkey.pem')
        });

        this.adminServer = server;
        this.adminServerSocket = new WebSocket.Server({ server });
        const closeHandle = this.adminServerSocket;
        process.on('SIGHUP', function () {
            closeHandle.close();
            console.log('About to exit');
            process.exit();
        });
    }

    startServer() {
        this.adminServerSocket.on('connection', (ws) => {
            this.adminServerSocket.clients.add(ws);

            const uuid = v4();
            console.log(`registered user: ${uuid}`);
            ws.send(this.formatDataForWebsocket(SocketEnums.ClientRegister, uuid));
            // this.clients[uuid] = ws;


            ws.on('message', (message: string) => {
                console.log(message);
                const msg = JSON.parse(message);

                if (msg.type === SocketEnums.ClientRegister) {
                    this.clients.push({ uuid: uuid, id: msg.data, socket: ws });
                }

                const foundWebsockets = this.clients.filter((socket) => {
                    return socket.id === msg.toClientId;
                });

                console.log(`msg: ${msg} sockets: ${!!foundWebsockets}`, msg);

                if (foundWebsockets.length > 0) {
                    let validMessageType = false;
                    for (let socketEnum in SocketEnums) {
                        validMessageType = validMessageType || (socketEnum == msg.type)
                        // console.log(`checking msgType:${msg.type} again ${socketEnum} result:${(socketEnum == msg.type)}`);
                    }
                    if (validMessageType) {
                        // console.log('sending to client');
                        foundWebsockets.forEach((websocket) => {
                            websocket.socket.send(this.formatDataForWebsocket(msg.type, msg.data));
                        });
                    }
                }
            });

            ws.on('error', (error) => {
                console.log(error);
            });

            ws.on('close', (error) => {
                this.clients = this.clients.filter((sockets) => {
                    return sockets.uuid !== uuid;
                });
                console.log(`deleted ${uuid}. remaining: ${this.clients.length}`);
            });
        });

        this.adminServer.listen(this.port);
        console.log(`Listening on port: ${this.port}`);
    }

    formatDataForWebsocket(dataType: SocketEnums, rawData: any): string {
        console.log(`DataType: ${dataType} / RawData: ${rawData}`);
        return JSON.stringify({ type: dataType, data: rawData });
    }
}