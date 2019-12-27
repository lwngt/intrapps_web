# base image
FROM nginx:1.15.8-alpine

# environment variables
ENV NODE_ENV="production"
ENV NODE_TLS_REJECT_UNAUTHORIZED="0"

# work directory
WORKDIR /work

# add resource files
ADD ./app/nginx/web_default.conf /etc/nginx/conf.d/
ADD ./app/src/public/assets/css /var/www/html/assets/css
ADD ./app/src/public/assets/fonts /var/www/html/assets/fonts
ADD ./app/src/public/assets/img /var/www/html/assets/img
ADD ./app/src/public/assets/js /var/www/html/assets/js
ADD ./app/src/public/assets/js/core /var/www/html/assets/js/core
ADD ./app/src/public/assets/js/plugins /var/www/html/assets/js/plugins
ADD ./app/src/public/assets/js/vendor /var/www/html/assets/js/vendor
