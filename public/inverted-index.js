'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Index class
 * @class
 */
var index = function () {
  /**
   * class constructor
   * @constructor
   */
  function index() {
    _classCallCheck(this, index);

    this.fileMap = {};
  }

  /**
   * removes special characters, white spaces and duplicates
   * @function
   * @param {string} text document title and text
   * @return {Array} tokens
   */


  _createClass(index, [{
    key: 'tokenize',
    value: function tokenize(text) {
      var unique = [];
      var token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
      token.forEach(function (item) {
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

  }, {
    key: 'createIndex',
    value: function createIndex(fileContent) {
      var _this = this;

      this.docCount = [];
      for (var object in fileContent) {
        this.docCount.push(parseInt(object, 10));
      }
      fileContent.forEach(function (fileObject, docTag) {
        var content = fileObject.title + ' ' + fileObject.text;
        var token = _this.tokenize(content);
        token.forEach(function (item) {
          if (item in _this.fileMap) {
            _this.fileMap[item].push(docTag);
          } else {
            _this.fileMap[item] = [];
            _this.fileMap[item].push(docTag);
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

  }, {
    key: 'getIndex',
    value: function getIndex() {
      return this.fileMap;
    }
    /**
     * Search Index
     * @function
     * @param {string} query string being searched
     * @return {Object} search result is returned
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(query) {
      var _this2 = this;

      var result = {};
      if (query === undefined) {
        return this.fileMap;
      }
      var search = query.split(' ');
      search.forEach(function (word) {
        if (_this2.fileMap[word]) {
          result[word] = _this2.fileMap[word];
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

  }, {
    key: 'isValid',
    value: function isValid(fileContent) {
      if (!fileContent[0] && fileContent[0].title) {
        return false;
      }
      return true;
    }
  }]);

  return index;
}();