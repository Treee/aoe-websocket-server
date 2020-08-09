FROM alpine

ARG server_port
ENV SERVER_PORT ${server_port}

RUN apk add --update npm

WORKDIR /aoe-websocket-server
COPY package.json /aoe-websocket-server/package.json
RUN npm install 

COPY . /aoe-websocket-server
RUN npm run build

EXPOSE ${server_port}

CMD ["npm", "start"]