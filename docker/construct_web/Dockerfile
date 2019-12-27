# base image
FROM nginx:1.15.8-alpine

# environment variables
ENV NODE_ENV="development"
ENV NODE_TLS_REJECT_UNAUTHORIZED="0"

# work directory
WORKDIR /work

# add resource files
ADD ./app/nginx/web_default.conf /etc/nginx/conf.d/
ADD ./app/src/public/assets/css /var/www/html/assets/css
ADD ./app/src/public/assets/fonts /var/www/html/assets/fonts
ADD ./app/src/public/assets/img/bg /var/www/html/assets/img/bg
ADD ./app/src/public/assets/img/faces /var/www/html/assets/img/faces
ADD ./app/src/public/assets/img/flags /var/www/html/assets/img/flags
ADD ./app/src/public/assets/js/core /var/www/html/assets/js/core
ADD ./app/src/public/assets/js/plugins /var/www/html/assets/js/plugins
ADD ./app/src/public/assets/js/vendor /var/www/html/assets/js/vendor
