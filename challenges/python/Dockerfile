FROM ubuntu:14.04

WORKDIR /app

RUN apt-get install python && apt get-install python-pip && pip install unittest

ADD python /app

ADD palindrome /app/palindrome

VOLUME /contest

CMD cp /contest/test.py test.py && python main.py
