package main

import (
	"fmt"
	"bufio"
	"os"
	"strings"
	"./palindrome"
)

func main() {
  if file, err := os.Open("/app/palindromes.txt"); err == nil {
		// make sure to close the file afterwards
    defer file.Close()

    scanner := bufio.NewScanner(file)
		exit_code := 0

    for scanner.Scan() {
				s := strings.Split(scanner.Text(), "\t")
				line, expected := s[0], s[1]
				result := "F"
				if palindrome.IsPalindrome(line) {
					result = "T"
				}
        fmt.Print("line: " + line)
				if (result == expected) {
					fmt.Println(" : ok")
				} else {
					exit_code = 1
					fmt.Println(" : ERROR")
				}
    }

    // check for exit_code
    if err = scanner.Err(); err != nil {
      panic(err)
    }

		os.Exit(exit_code)

  } else {
		panic(err)
  }
}
