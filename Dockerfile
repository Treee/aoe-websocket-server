FROM alpine

RUN apk add --update npm

WORKDIR /aoe-websocket-server
COPY package.json /aoe-websocket-server/package.json
RUN npm install 

COPY . /aoe-websocket-server
RUN npm run build

EXPOSE 8443

CMD ["npm", "start"]