FROM centos

# ADD ./install-nvm.sh .
# RUN chmod +x install-nvm.sh
# RUN ./install-nvm.sh

RUN yum update && \
    yum upgrade -y && \
    yum install -y git && \
    yum install -y gcc-c++ make && \ 
    yum clean all && \
    rm -rf /var/cache/yum

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

# ADD ./install-dependencies.sh .
# RUN chmod +x install-dependencies.sh
# RUN ./install-dependencies.sh

RUN git clone https://github.com/Treee/aoe-websocket-server
RUN cd aoe-websocket-server
RUN npm install

EXPOSE 8443

CMD npm start