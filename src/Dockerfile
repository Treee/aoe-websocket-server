FROM alpine:3.9

RUN yum update && \
    yum upgrade -y && \
    yum install -y git

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

RUN nvm install node

RUN git clone https://github.com/Treee/aoe-websocket-server

RUN cd aoe-websocket-server

RUN npm install

EXPOSE 8443

CMD ["npm", "start-server"]