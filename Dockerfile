FROM nginx:alpine

RUN apk add --update certbot-nginx

# COPY nginx.conf /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]