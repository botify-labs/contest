FROM alpine

WORKDIR /app

RUN apk update && \
    apk add nodejs && \
    npm install -g mocha babel-cli && \
    npm install babel-preset-es2015

ADD js /app

ADD palindrome /app/palindrome

VOLUME /contest

CMD cp /contest/test.js test.js && babel test.js -o test.js --presets es2015 && mocha index.js
