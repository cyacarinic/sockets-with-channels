FROM node:6.3.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /usr/local/app && cp -a /tmp/node_modules /usr/local/app
WORKDIR /usr/local/app

RUN ln -s /tmp/node_modules/gulp/bin/./gulp.js /usr/bin/gulp

ADD . /usr/local/app

EXPOSE 3000