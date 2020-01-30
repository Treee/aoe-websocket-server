FROM alpine

RUN apk add --update npm
RUN apk add --update git

RUN git clone https://github.com/Treee/aoe-websocket-server
RUN cd aoe-websocket-server && npm install && npm run build

EXPOSE 8443

ADD ./start-server.sh .
RUN chmod +x ./start-server.sh
CMD ./start-server.sh