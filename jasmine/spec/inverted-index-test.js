
const InvertedIndex = require('../../src/inverted-index');

const book = require('../books.json');


describe('Inverted Index', () => {
    beforeEach( () => {
        this.index = new InvertedIndex();
        this.create = this.index.createIndex(book, 'books');
        this.getIndex = this.index.getIndex('books');
    });
    it('should create an object once a class is instantiated', () => {
        expect (this.index).toEqual(jasmine.any(Object));
    });

    describe('Read book data',  () => {
        const filename = {
            'name':'file.json',
        };
        const filename2 = {
            'name':'file2.js',
        }
        const file = []
        it('should ensure the file content is actually a valid JSON Array', () => {
            expect(this.index.isValidFile(filename)).toEqual(true);
        });
        it('should ensure the file content is actually a valid JSON Array', () => {
            expect(this.index.isValidFile(filename)).toEqual(true);
        });
        it('should ensure the file is not empty', () => {
            expect(this.index.isnotEmpty(file)).toEqual('Json file is empty');
        });
    });

    describe('Populate Index',  () => {
        it('should populate the index object once it creates an index',()=>{
        expect(this.index.getIndex('books').hasOwnProperty('alice')).toBeTruthy();
        });

        it('verifies that index maps strings to the correct Json objects', () => {
            expect(this.index.getIndex('books')['alice']).toEqual([0]);;
        });
    });

    describe('Search Index',  () => {
        it('search index of words correctly', () => {
            expect(this.index.searchIndex('alice', 'books')).toEqual({ alice: [ 0 ] });
        });
        
    })

    describe('Tokenize', () => {
        it('Removes special characters', () => {
            expect(this.index.tokenize('alice !!!!, hello, world')).toEqual([ 'alice', 'hello', 'world' ]);
            expect(this.index.tokenize('Today is **!!')).toEqual([ 'today', 'is']);
        });
        it('Removes duplicates', () => {
            expect(this.index.tokenize('alice , alice, jane')).toEqual(['alice', 'jane']);
        });
        it('Creates an array of tokens', () => {
            expect(this.index.tokenize(book[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
    });

    describe('Get Index', () => {
        it('returns an object that is an accurate index of the content of the JSON file', () => {
            expect(this.index.getIndex('books')).toEqual(jasmine.any(Object));
        });
    });

    
})