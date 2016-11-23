'use strict';
var index = require('../../src/inverted-index');
var book = require('../books.json');

var invertedIndex;

describe('Inverted index class', ()=>{
    beforeEach(function(){
        invertedIndex = new index();
        invertedIndex.createIndex(book);
    });
});

describe('constructor', function(){
    it('invertedIndex is an instace of index class', function(){
        invertedIndex = new index();
        invertedIndex.createIndex(book);
       expect(invertedIndex).toEqual(jasmine.any(Object));
    });
});

describe('createIndex', ()=>{
    it('creates index', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        //expect(invertedIndex.createIndex(book).a).toEqual([0,1])
    });

    it('Saves the lenght of the documents', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.docCount.length).toEqual(2);
    });

});

describe('Get Index', ()=>{
    it('returns an object that is an accurate index of the content of the JSON file', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.getIndex()).toEqual(jasmine.any(Object));
    });
});

describe('Tokenize', function(){
    it('Removes special characters', function(){
        invertedIndex = new index();
        expect(invertedIndex.tokenize('alice !!!!, hello, world')).toEqual([ 'alice', 'hello', 'world' ]);
        expect(invertedIndex.tokenize('Today is **!! , a good!. day to smile, smile')).toEqual([ 'today', 'is', 'a', 'good', 'day', 'to', 'smile' ]);
    });

    it('Removes duplicates', ()=>{
        invertedIndex = new index();
        expect(invertedIndex.tokenize('alice , alice alice jane')).toEqual(['alice', 'jane']);
    });

    it('Creates an array of tokens', ()=>{
        invertedIndex = new index();
        expect(invertedIndex.tokenize(book[0].title)).toEqual(['alice', 'in', 'wonderland']);
    });
});

describe('Search Index', ()=>{
    it('returns an Array of numbers', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.searchIndex().of).toEqual([0,1]);
    });

    it('returns the index for the term searched', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.searchIndex().of).toEqual([0,1]);
        expect(invertedIndex.searchIndex().alice).toEqual([0]);
    });

    it('searchIndex can handle an array of search terms', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.searchIndex('alice in the')).toEqual({ alice: [ 0 ], in: [ 0 ], the: [ 1 ] });
    });

    it('returns an error message if search query not found', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.searchIndex('rose')).toEqual('Search Query Not Found');
    });
});

describe('Read Book', function(){
    it('Ensure file content is a valid json file', function(){


    });

});







describe('Populate Index', function(){
    it('verifies index is created once JSON is read', function(){
        
    });

    it('verifies index is created once JSON is read', function(){
        
    });




})