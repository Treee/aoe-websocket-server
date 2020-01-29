FROM centos

ADD ./install-nvm.sh .
RUN chmod +x install-nvm.sh
RUN ./install-nvm.sh

RUN yum update && \
    yum upgrade -y && \
    yum install -y git

ADD ./install-dependencies.sh .
RUN chmod +x install-dependencies.sh
RUN ./install-dependencies.sh

EXPOSE 8443

ADD ./start-server.sh .
RUN chmod +x start-server.sh

CMD ./start-server.sh