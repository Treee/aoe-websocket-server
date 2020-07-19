FROM alpine

RUN apk add --update npm

WORKDIR /aoe-websocket-server
COPY package.json /aoe-websocket-server/package.json
RUN npm install 

COPY . /aoe-websocket-server
RUN npm run build

EXPOSE 8443
EXPOSE 8445
EXPOSE 443
EXPOSE 80

CMD ["npm", "start"]