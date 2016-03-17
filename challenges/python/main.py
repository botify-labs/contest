import unittest

from test import isPalyndrome

class TestPalindrome(unittest.TestCase):

    def test_function(self):
        for line in open('./palindrome', 'r'):
            str_to_test, _is_a_palindrome = line.split('\t')
            is_a_palindrome = _is_a_palindrome == 'T\n'
            self.assertEqual(isPalindrome(str_to_test), is_a_palindrome)
            print str_to_test

if __name__ == '__main__':
    unittest.main()
