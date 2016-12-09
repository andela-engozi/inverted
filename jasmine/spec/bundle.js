/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const InvertedIndex = __webpack_require__(1);
	
	const book = __webpack_require__(2);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Index class
	 * @class
	 */
	class InvertedIndex {
	  /**
	   * class constructor
	   * @constructor
	   */
	  constructor() {
	    this.indexes = {};
	  }
	
	  /**
	   * removes special characters, white spaces and duplicates
	   * @function
	   * @param {string} text document title and text
	   * @return {Array} tokens
	   */
	  tokenize(text) {
	    const uniqueWords = [];
	    const token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
	    token.forEach((item) => {
	      if (!uniqueWords.includes(item)) {
	        uniqueWords.push(item);
	      }
	    });
	    return uniqueWords;
	  }
	
	  /**
	   * create index
	   * @function
	   * @param {Array} jsonArray objects in an Array
	   * @param {title} title file title
	   * @return {Object} index object
	   */
	  createIndex(jsonArray, title) {
	    this.fileMap = {};
	    jsonArray.forEach((JsonObject, index) => {
	      const tokens = this.tokenize(`${JsonObject.title} ${JsonObject.text}`);
	      tokens.forEach((token) => {
	        if(token in this.fileMap){
	          this.fileMap[token].push(index);
	        }
	        else {
	          this.fileMap[token] = [];
	          this.fileMap[token].push(index);
	        }
	      });
	      this.indexes[title] = this.fileMap
	    });
	    return this.indexes
	  }
	  
	  /**
	   * Get index
	   * @function
	   * @return {Object} index object
	   */
	  getIndex(title) {
	    return this.indexes[title];
	  }
	
	  /**
	   * Search Index
	   * @function
	   * @param {string} query string being searched
	   * @return {Object} search result is returned
	   */
	  searchIndex(query, title) {
	    const result = {};
	    if (query === undefined) {
	      return this.fileMap;
	    }
	    const search = query.split(' ');
	    search.forEach((word) => {
	      if (this.fileMap[word]) {
	        result[word] = this.fileMap[word];
	      }
	    });
	    return Object.keys(result).length > 0 ? result : 'Search Query Not Found';
	  }
	
	  /**
	   * get the number of objects
	   */
	  documentCount(jsonArray) {
	    this.Documents = [];
	    for (const object in jsonArray) {
	      this.Documents.push(parseInt(object));
	    }
	    return this.Documents;
	  }
	
	  /**
	   * isValid
	   * @function
	   * @param {Array} fileContent
	   * @return {boolean} statement is returned
	   */
	  isValid(fileContent) {
	    if (!fileContent[0] && fileContent[0].title) {
	      return false;
	    }
	    return true;
	  }
	
	  isValidFile(file) {
	    if (!file.name.toLowerCase().match(/\.json$/)) {
	      return false;
	    }
	    return true;
	  }
	  isnotEmpty(file) {
	    if(file[0] === undefined) {
	      return 'Json file is empty';
	    }
	    return true;
	  }
	}
	module.exports = InvertedIndex;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = [
		{
			"title": "Alice in Wonderland",
			"text": "Alice falls into a rabbit hole and enters a world full of imagination."
		},
		{
			"title": "The Lord of the Rings: The Fellowship of the Ring.",
			"text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
		},
		{
			"title": "Hello its me .",
			"text": "I was wondering if after all these ."
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=ce63a770ddd497ef35cf.js.map