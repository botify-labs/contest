FROM ubuntu:14.04

WORKDIR /app

RUN apt-get install python

ADD python /app

ADD palindrome /app/palindrome

VOLUME /contest

CMD cp /contest/test.py test.py && python main.py
