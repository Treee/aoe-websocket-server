FROM node:alpine

RUN ["git", "clone", "https://github.com/Treee/aoe-websocket-server"]
RUN ["cd", "aoe-websocket-server"]

RUN ["npm", "install"]

EXPOSE 8443

CMD ["npm", "start-server"]