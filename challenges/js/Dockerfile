FROM alpine

WORKDIR /app

RUN apk update && \
    apk add nodejs && \
    npm install -g mocha && \
    npm install babel-register babel-preset-es2015 babel-preset-stage-0

ADD js /app

ADD palindrome /app

VOLUME /contest

CMD mocha index.js
