
const book = require('../books.json');
const badFile = require('../bad.json');
const empty = require('../empty.json');
const valid = require('../valid.json');

describe('Inverted Index', () => {
    beforeEach( () => {
        this.index = new InvertedIndex();
        this.create = this.index.createIndex(book, 'books');
        this.create1 = this.index.createIndex(valid, 'valid');
        this.getIndex = this.index.getIndex('books');
    });
    it('should create an object once a class is instantiated', () => {
        expect (this.index).toEqual(jasmine.any(Object));
    });

    describe('Read book data',  () => {
        const file = {'name': 'book.json',};
        const file1 = {'name': 'empty.js',};
        const empty = [];
        const book = [{'title': 'hello'}];
        it('should ensure the file content is actually a valid JSON Array', () => {
            expect(Helper.isValidFile(file)).toEqual(true);
            expect(Helper.isValidFile(file1)).toEqual(false);
        });
        it('should ensure the file is not empty', () => {
            expect(Helper.isnotEmpty(empty)).toEqual('Json file is empty');
            expect(Helper.isnotEmpty(book)).toEqual(true);
        });
    });

    describe('Populate Index',  () => {
        it('should ensure the index is created once the JSON file has been read',()=>{
            expect(this.index.getIndex('books').hasOwnProperty('alice')).toBeTruthy();
            expect(this.index.getIndex('books').hasOwnProperty('the')).toBeTruthy();
        });

        it('should ensure index is correct', () => {
            expect(this.index.getIndex('books')['alice']).toEqual([0]);
            expect(this.index.getIndex('books')['the']).toEqual([1]);
            expect(this.index.getIndex('books')['a']).toEqual([0,1]);
        });
        it('should return an array that contains the indexes of a word', () => {
            expect(this.index.getIndex('books').alice).toEqual([0]);
            expect(this.index.getIndex('books').wonderland).toEqual([0]);
        });

        it('should ensure index is not overwritten by a new JSON file', () => {
            expect(Object.keys(this.index.indexes)).toEqual([ 'books', 'valid']);
        });
    });

    describe('Search Index',  () => {
        it('returns the correct index when searched', () => {
            expect(this.index.searchIndex('books', 'alice')).toEqual({ alice: [ 0 ] });
        });

        it ('Can handle a varied number of search terms as arguments.', () => {
            expect(this.index.searchIndex('books', 'alice', 'wonderland')).toEqual({ alice: [ 0 ], wonderland: [ 0 ] });
        });
        it('should return an array of search terms', ()=> {
            expect(this.index.searchIndex('books',['alice', 'wonderland']).toEqual({ alice: [ 0 ], wonderland: [ 0 ] }));
        });
        it ('Goes through all indexed files if a filename is not passed', () => {
            expect(this.index.searchAllfiles('alice', 'wonderland', 'some', 'hill')).toEqual({ books:({ alice: [ 0 ], wonderland: [ 0 ] }), valid:({ some: [ 0 ], hill: [ 0 ] }) });
        });
        
    });

    describe('Tokenize', () => {
        it('Removes special characters', () => {
            expect(Helper.tokenize('alice !!!!, hello, world')).toEqual([ 'alice', 'hello', 'world' ]);
            expect(Helper.tokenize('Today is **!!')).toEqual([ 'today', 'is']);
        });
        it('Removes duplicates', () => {
            expect(Helper.tokenize('alice , alice, jane')).toEqual(['alice', 'jane']);
        });
        it('Creates an array of tokens', () => {
            expect(Helper.tokenize(book[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
    });

    describe('Get Index', () => {
        it('returns an object that is an accurate index of the content of the JSON file', () => {
            expect(this.index.getIndex('books')).toEqual(jasmine.any(Object));
        });
    });

    
});