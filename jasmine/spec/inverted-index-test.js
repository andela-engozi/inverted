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

describe('getIndex', ()=>{
    it('returns an array of numbers', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.getIndex('of')).toEqual(jasmine.any(Array));
    });

    it('returns an array with the correct index', ()=>{
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.getIndex('of')).toEqual([0,1]);
        expect(invertedIndex.getIndex('alice')).toEqual([0]);
        expect(invertedIndex.getIndex('hole')).toEqual([0]);
        expect(invertedIndex.getIndex('a')).toEqual([0, 1]); 
    });
});

describe('Tokenize', function(){
    it('removes special characters', function(){
        invertedIndex = new index();
        expect(invertedIndex.tokenize('alice !!!!, hello, world')).toEqual([ 'alice', 'hello', 'world' ]);
        expect(invertedIndex.tokenize('Today is **!! , a good!. day to smile, smile')).toEqual([ 'today', 'is', 'a', 'good', 'day', 'to', 'smile' ]);

    });

});

describe('Read Book', function(){
    it('Ensure file content is a valid json file', function(){


    });

});


describe('constructor', function(){
    it('invertedIndex is an instace of index class', function(){
        invertedIndex = new index();
        invertedIndex.createIndex(book);
       expect(invertedIndex).toEqual(jasmine.any(Object));
    });
});




describe('Populate Index', function(){
    it('verifies index is created once JSON is read', function(){
        
    });

    it('verifies index is created once JSON is read', function(){
        
    });

describe('search Index', function(){
    it('should return the correct index', function(){
        invertedIndex = new index();
        invertedIndex.createIndex(book);
        expect(invertedIndex.searchIndex('of')).toEqual([0,1]);
        expect(invertedIndex.searchIndex('ngozi')).toEqual('record not found');

    });
});


})