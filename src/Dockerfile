FROM alpine

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git && \
    apt-get install -y gcc-c++ make && \
    apt-get install -y nodejs

RUN git clone https://github.com/Treee/aoe-websocket-server
RUN cd aoe-websocket-server && npm install

EXPOSE 8443

CMD npm start