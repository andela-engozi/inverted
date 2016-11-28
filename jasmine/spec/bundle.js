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
	class index {
	  /**
	   * class constructor
	   * @constructor
	   */
	  constructor() {
	    this.fileMap = {};
	  }
	
	  /**
	   * removes special characters, white spaces and duplicates
	   * @function
	   * @param {string} text document title and text
	   * @return {Array} tokens
	   */
	  tokenize(text) {
	    const unique = [];
	    const token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
	    token.forEach((item) => {
	      if (!unique.includes(item)) {
	        unique.push(item);
	      }
	    });
	    return unique;
	  }
	
	  /**
	   * create index
	   * @function
	   * @param {Array} fileContent objects in an Array
	   * @return {Object} index object
	   */
	  createIndex(fileContent) {
	    this.docCount = [];
	    for (const object in fileContent) {
	      this.docCount.push(parseInt(object, 10));
	    }
	    fileContent.forEach((fileObject, docTag) => {
	      const content = `${fileObject.title} ${fileObject.text}`;
	      const token = this.tokenize(content);
	      token.forEach((item) => {
	        if (item in this.fileMap) {
	          this.fileMap[item].push(docTag);
	        } else {
	          this.fileMap[item] = [];
	          this.fileMap[item].push(docTag);
	        }
	      });
	    });
	    return this.fileMap;
	  }
	  /**
	   * Get index
	   * @function
	   * @return {Object} index object
	   */
	  getIndex() {
	    return this.fileMap;
	  }
	  /**
	   * Search Index
	   * @function
	   * @param {string} query string being searched
	   * @return {Object} search result is returned
	   */
	  searchIndex(query) {
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
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=69f996cfaa3b65062808.js.map