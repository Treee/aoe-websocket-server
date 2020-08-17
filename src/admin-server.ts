import WebSocket = require('ws');

import { v4 } from 'uuid';
import { SocketEnums } from './server-enums';
import uuid = require('uuid');

export class AdminServer {
    private adminServerSocket: WebSocket.Server;

    private clients: { uuid: string, id: string, socket: WebSocket }[] = [];

    isDebug: boolean = false;
    socketServerPort: number = parseInt(process.env.SERVER_PORT || '8443');

    constructor() {

        const serverOptions: WebSocket.ServerOptions = {
            port: this.socketServerPort
        };

        this.adminServerSocket = new WebSocket.Server(serverOptions);
        const closeHandle = this.adminServerSocket;
        process.on('SIGHUP', function () {
            closeHandle.close();
            console.log('About to exit');
            process.exit();
        });
    }

    startServer() {
        this.adminServerSocket.on('connection', (ws) => {

            const uuid = this.sendRegistrationToClient(ws);

            ws.on('message', (message: string) => {
                // console.log(message);
                const msg = JSON.parse(message);
                const applicableWebsockets = this.getApplicableWebsockets(msg.toClientId);
                if (msg.type === SocketEnums.ClientRegister) {
                    this.registerWebsocket(uuid, msg.data, ws);
                }
                else if (msg.type === SocketEnums.PING) {
                    applicableWebsockets.forEach((websocket) => {
                        websocket.socket.send(JSON.stringify({ type: "PONG", data: "PONG" }));
                    });
                }
                else if (applicableWebsockets.length > 0) {
                    if (this.isValidWebsocketMessageType(msg.type)) {
                        applicableWebsockets.forEach((websocket) => {
                            websocket.socket.send(this.formatDataForWebsocket(msg.type, msg.data));
                        });
                    }
                }
            });

            ws.on('close', (error) => {
                this.removeWebsocket(uuid);
            });

            ws.on('error', (error) => {
                console.log(error);
            });
        });
        console.log(`Listening on port: ${this.socketServerPort}`);
    }

    getApplicableWebsockets(clientId: string): { uuid: string, id: string, socket: WebSocket }[] {
        const foundWebsockets = this.clients.filter((socket) => {
            return socket.id === clientId;
        });
        return foundWebsockets;
    }

    isValidWebsocketMessageType(messageType: string): boolean {
        let validMessageType = false;
        for (let socketEnum in SocketEnums) {
            validMessageType = validMessageType || (socketEnum == messageType)
            // console.log(`checking msgType:${msg.type} again ${socketEnum} result:${(socketEnum == msg.type)}`);
        }
        //ignore pings and registers
        validMessageType = messageType !== "PING";
        validMessageType = messageType !== "ClientRegister";
        return validMessageType;
    }

    sendRegistrationToClient(websocket: WebSocket): string {
        const uuid = v4();
        console.log(`sent client registration to user: ${uuid}`);
        websocket.send(this.formatDataForWebsocket(SocketEnums.ClientRegister, uuid));
        return uuid;
    }

    registerWebsocket(uniqueId: string, clientId: string, websocket: WebSocket) {
        console.log(`adding client ${clientId} with UIID ${uniqueId}`);
        this.clients.push({ uuid: uniqueId, id: clientId, socket: websocket });
    }

    removeWebsocket(uniqueId: string) {
        console.log(`attempting to remove client with UIID ${uniqueId}`);
        this.clients = this.clients.filter((sockets) => {
            return sockets.uuid !== uniqueId;
        });
    }

    formatDataForWebsocket(dataType: SocketEnums, rawData: any): string {
        if (dataType !== SocketEnums.PING) {
            console.log(`DataType: ${dataType} / RawData: ${rawData}`);
        }
        return JSON.stringify({ type: dataType, data: rawData });
    }
}