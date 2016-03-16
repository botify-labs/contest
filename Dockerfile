FROM docker:1.10

WORKDIR /app

ADD package.json /app/package.json

RUN apk update && \
    apk add nodejs git python make g++ && \
    npm install

ADD . /app

CMD npm start
