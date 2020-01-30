FROM alpine

RUN apk add --update npm
RUN apk add --update git

RUN git clone https://github.com/Treee/aoe-websocket-server

WORKDIR /aoe-websocket-server
COPY package.json .
RUN npm install && npm run build

COPY build/ /aoe-websocket-server/build

EXPOSE 8443

COPY ./start-server.sh .
RUN chmod +x ./start-server.sh
CMD ./start-server.sh