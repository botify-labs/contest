const assert = require('assert')
const fs = require('fs')

const contest = require('./test.js').isPalindrome

const fileContent = fs.readFileSync('./palindrome', { encoding: 'utf8' })

describe('Contest function test', () => {
  fileContent.split('\n').forEach(p => {
    const testString = p.split('\t')[0]
    const isPalindrome = p.split('\t')[1] === 'T' ? true : false 
    it(testString, () => {
      assert.equal(contest(testString), isPalindrome)
    })
  })
})
