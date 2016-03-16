FROM alpine

WORKDIR /app

RUN apk update && \
    apk add nodejs && \
    npm install -g mocha

ADD . /app

VOLUME /app/contest

CMD mocha index.js
