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

	'use strict';
	var index = __webpack_require__(1);
	var book = __webpack_require__(2);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	class index{
	    constructor(){
	      this.fileMap = {};
	    }
	    
	    //create index
	    createIndex(fileContent){
	        this.docCount = [];
	        for(const object in fileContent){
	            //explain this
	            this.docCount.push(parseInt(object,10));
	        };
	        fileContent.forEach((item, index)=>{
	            let content = `${item.title} ${item.text}`;
	            const token = this.tokenize(content);
	            token.forEach((item)=>{  
	                if(item in this.fileMap){
	                    this.fileMap[item].push(index);
	                }else{
	                    this.fileMap[item] =[];
	                    this.fileMap[item].push(index);
	                }
	            });
	        });
	        return this.fileMap;
	        }
	
	    //get index
	    getIndex(){
	        return this.fileMap;
	    }
	
	    //search index
	    searchIndex(query){
	        const result = {};
	        const search = query.split(' ');
	        search.forEach((word) =>{
	            if (this.fileMap.hasOwnProperty(word)){
	                result[word] = this.fileMap[word];
	            }
	        });
	
	        return Object.keys(result).length>0? result : 'Search Query Not Found';   
	    }
	
	    //tokenize
	    tokenize(text){
	        let unique =[];
	        let token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
	        token.forEach((item)=>{
	            if(!unique.includes(item)){
	                unique.push(item);
	            }
	        });
	        return unique;
	    }
	
	    
	}
	
	// module.exports = index;

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
			"title": "The ththththththth",
			"text": "An unusual alliance of  hjhjnyjr jjjjhjhj !!!!!! .....$$$$$ß."
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=a3286d1bf54ebb361308.js.map