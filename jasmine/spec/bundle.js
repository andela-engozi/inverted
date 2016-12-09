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

	
	const index = __webpack_require__(1);
	
	const book = __webpack_require__(2);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Index class
	 * @class
	 */
	class Invertedindex {
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
	   * get the document count
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
	}
	


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
//# sourceMappingURL=4b88074408a9dbf2c860.js.map