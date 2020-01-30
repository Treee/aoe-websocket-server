FROM alpine

RUN apk add --update npm
RUN apk add --update git

RUN git clone https://github.com/Treee/aoe-websocket-server
RUN cd aoe-websocket-server && npm install

EXPOSE 8443

CMD cd aoe-websocket-server && npm start