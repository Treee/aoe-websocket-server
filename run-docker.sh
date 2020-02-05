#!/bin/bash
docker run -d -v /etc/letsencrypt:/etc/letsencrypt -p 8445:8445 --name testsocket -it aoe-websockets:latest
