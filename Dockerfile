FROM node:12

MAINTAINER yank0vy3rdna <bibiwa2001@gmail.com>

WORKDIR /usr/src/app

COPY . .

EXPOSE 9127
CMD [ "node", "app.js" ]
