FROM alpine

RUN apk add --update npm
RUN apk add --update git

WORKDIR /aoe-websocket-server
COPY package.json /aoe-websocket-server/package.json
RUN cd aoe-websocket-server && npm install && npm run build

COPY . /aoe-websocket-server

EXPOSE 8443

COPY ./start-server.sh .
RUN chmod +x ./start-server.sh
CMD ./start-server.sh