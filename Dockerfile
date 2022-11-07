FROM nginx:latest

WORKDIR /usr/share/nginx/html
ADD dist app
COPY nginx.conf /etc/nginx/conf.d/app.com.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]