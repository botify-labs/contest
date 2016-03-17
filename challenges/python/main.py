import unittest

from test import isPalindrome

FAIL = '\033[91m'
OKGREEN = '\033[92m'
ENDC = '\033[0m'

class TestPalindrome(unittest.TestCase):

    def test_function(self):
        for line in open('./palindrome', 'r'):
            str_to_test, _is_a_palindrome = line.split('\t')
            is_a_palindrome = _is_a_palindrome == 'T\n'
            print "{}{}{}".format(OKGREEN, str_to_test, ENDC)
            try:
                self.assertEqual(isPalindrome(str_to_test), is_a_palindrome)
            except Exception as e:
                print "{}{}{}".format(FAIL, str_to_test, ENDC)
                self.assertEqual(isPalindrome(str_to_test), is_a_palindrome)
                
if __name__ == '__main__':
    unittest.main()

