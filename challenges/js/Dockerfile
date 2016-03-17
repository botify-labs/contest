FROM ubuntu:14.04

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g mocha babel-cli && \
    npm install babel-preset-es2015

ADD js /app

ADD palindrome /app/palindrome

VOLUME /contest

CMD cp /contest/test.js test.js && babel test.js -o test.js --presets es2015 && mocha index.js
