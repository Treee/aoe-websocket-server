FROM nginx:alpine

RUN apk add --update certbot-nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN certbot certonly --nginx 

# COPY nginx.conf /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]