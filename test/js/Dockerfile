FROM alpine

WORKDIR /app

RUN apk update && \
    apk add nodejs && \
    npm install -g mocha

ADD js /app

ADD palindrome /app

VOLUME /contest

CMD mocha index.js
