from test import isPalyndrome

for line in open('../palindrome', 'r'):
    str_to_test, _is_a_palindrome = line.split('\t')
    is_a_palindrome = _is_a_palindrome == 'T\n'

    if isPalyndrome(str_to_test) != is_a_palindrome:
        raise ValueError("'{}' is {}a palindrome.", str, '' if is_a_palindrome else 'not ')
