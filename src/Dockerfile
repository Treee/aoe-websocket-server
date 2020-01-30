FROM alpine

RUN apk add --update npm
RUN apk add --update git

RUN git clone https://github.com/Treee/aoe-websocket-server
RUN cd aoe-websocket-server && npm install && npm run build

EXPOSE 8443

ADD ./start-docker.sh des.
RUN chmod +x ./start-docker.sh
CMD ./start-docker.sh