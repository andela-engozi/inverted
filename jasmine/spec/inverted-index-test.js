
const index = require('../../src/inverted-index');

const book = require('../books.json');

describe('constructor', () => {
    const invertedIndex = new index();
    invertedIndex.createIndex(book);
    it('invertedIndex is an instance of index class', () => {
       expect(invertedIndex).toEqual(jasmine.any(Object));
    });
});

describe('createIndex', () => {
     invertedIndex = new index();
     invertedIndex.createIndex(book);
    it('creates index', () => {

        //expect(invertedIndex.createIndex(book).a).toEqual([0,1])
    });
    it('Saves the lenght of the documents', () => {
        expect(invertedIndex.docCount).toEqual(2);
    });
});

describe('Read Book', () => {
    invertedIndex = new index();
    invertedIndex.createIndex(book);
    it('Ensure file content is a valid json file', () => {
        expect(invertedIndex.isValid(book)).toBe(true);
    });
});

describe('Get Index', () => {
    invertedIndex = new index();
    invertedIndex.createIndex(book);
    it('returns an object that is an accurate index of the content of the JSON file', () => {
        expect(invertedIndex.getIndex()).toEqual(jasmine.any(Object));
    });
});

describe('Tokenize', () => {
    invertedIndex = new index();
    it('Removes special characters', () => {
        expect(invertedIndex.tokenize('alice !!!!, hello, world')).toEqual([ 'alice', 'hello', 'world' ]);
        expect(invertedIndex.tokenize('Today is **!!')).toEqual([ 'today', 'is']);
    });
    it('Removes duplicates', () => {
        expect(invertedIndex.tokenize('alice , alice, jane')).toEqual(['alice', 'jane']);
    });
    it('Creates an array of tokens', () => {
        expect(invertedIndex.tokenize(book[0].title)).toEqual(['alice', 'in', 'wonderland']);
    });
});

describe('Search Index', () => {
    invertedIndex = new index();
    invertedIndex.createIndex(book);
    it('returns an Array of numbers', () => {
        expect(invertedIndex.searchIndex().of).toEqual([0,1]);
    });
    it('returns the index for the term searched', () => {
        expect(invertedIndex.searchIndex().of).toEqual([0,1]);
        expect(invertedIndex.searchIndex().alice).toEqual([0]);
    });
    it('searchIndex can handle an array of search terms', () => {
        expect(invertedIndex.searchIndex('alice in the')).toEqual({ alice: [ 0 ], in: [ 0 ], the: [ 1 ] });
    });
    it('returns an error message if search query not found', () => {
        expect(invertedIndex.searchIndex('rose')).toEqual('Search Query Not Found');
    });
});


describe('Populate Index', () => {
    invertedIndex = new index();
    invertedIndex.createIndex(book);
    it('verifies index is created once JSON is read', () => {
        expect(invertedIndex.fileMap).toEqual(jasmine.any(Object));
    });
    it('ensures index is correct', () => {

        expect(invertedIndex.fileMap.alice).toEqual([0]);
    });

});