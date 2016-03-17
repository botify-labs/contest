FROM ubuntu:14.04

WORKDIR /app

RUN apt-get update && apt-get install python-pip -y && pip install unittest2

ADD python /app

ADD palindrome /app/palindrome

VOLUME /contest

CMD cp /contest/test.py test.py && python main.py
