FROM golang:1.6

ADD golang /app
ADD palindrome /app/palindromes.txt

VOLUME /contest

WORKDIR /app

RUN mkdir palindrome/

CMD cp /contest/test.go palindrome/palindrome.go && go run main.go
