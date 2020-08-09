# aoe-websocket-server

This repo/container serves as the standalone websocket server for facilitating communication between Admin clients and client overlay browser sources. This server needs to run in order for the tech-widget-overlay to work.

## Build

- `docker build . --build-arg server_port=8080 -t latest`

## Run

- If you are not deploying in a stack, make sure you expose the above port in the run command.
- `docker run -d -t aoe-websocket-server -p 8080:8080`
