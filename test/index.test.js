const { sentenceFormatter } = require('../index');
const { expectedPhrases, testPhrases, expectedInvertedPhrases } = require('./fixtures');

const assert = require('assert');

describe('test', function() {
    it('should return corrected sentence - SPANISH', function() {
      testPhrases.forEach((phrase, index) => {
        const formatedSentece = sentenceFormatter(phrase);
        const expectedSentence = expectedPhrases[index];
        console.log(`${phrase} -> ${formatedSentece} : ${expectedSentence}`);
        expectedSentence.forEach((word, idx) => assert.equal(word, formatedSentece[idx]))
      })
    });

    it('should return corrected sentence - RIGHT TO LEFT SPANISH', function() {
        testPhrases.forEach((phrase, index) => {
          const invertedPhrase = phrase.split('').reverse().join('');
          const formatedSentece = sentenceFormatter(invertedPhrase, 'AR');
          const expectedSentence = expectedInvertedPhrases[index];
          console.log(`${invertedPhrase} -> ${expectedSentence} : ${formatedSentece}`);
          expectedSentence.forEach((word, idx) => assert.equal(word, formatedSentece[idx]))
        })
      });
  
});