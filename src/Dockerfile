FROM centos

ADD ./install-nvm.sh .
RUN chmod +x install-nvm.sh
RUN ./install-nvm.sh

RUN yum update && \
    yum upgrade -y && \
    yum install -y git

RUN git clone https://github.com/Treee/aoe-websocket-server

RUN cd aoe-websocket-server

RUN npm install

EXPOSE 8443

CMD ["npm", "start-server"]