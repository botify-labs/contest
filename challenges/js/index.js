const assert = require('assert');
const fs = require('fs');

const contest = require('./test.js').isPalindrome;
const fileContent = fs.readFileSync('./palindrome', { encoding: 'utf8' });


describe('Contest function test', () => {
  fileContent.split('\n').forEach(p => {
    const temp = p.split('\t');
    const testString = temp[0];
    const isPalindrome = temp[1] === 'T';
    it(testString, () => {
      assert.equal(contest(testString), isPalindrome);
    });
  });
});
