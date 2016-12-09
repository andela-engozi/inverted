'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Index class
 * @class
 */
var InvertedIndex = function () {
  /**
   * class constructor
   * @constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.indexes = {};
  }

  /**
   * removes special characters, white spaces and duplicates
   * @function
   * @param {string} text document title and text
   * @return {Array} tokens
   */


  _createClass(InvertedIndex, [{
    key: 'tokenize',
    value: function tokenize(text) {
      var uniqueWords = [];
      var token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
      token.forEach(function (item) {
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

  }, {
    key: 'createIndex',
    value: function createIndex(jsonArray, title) {
      var _this = this;

      this.fileMap = {};
      jsonArray.forEach(function (JsonObject, index) {
        var tokens = _this.tokenize(JsonObject.title + ' ' + JsonObject.text);
        tokens.forEach(function (token) {
          if (token in _this.fileMap) {
            _this.fileMap[token].push(index);
          } else {
            _this.fileMap[token] = [];
            _this.fileMap[token].push(index);
          }
        });
        _this.indexes[title] = _this.fileMap;
      });
      return this.indexes;
    }

    /**
     * Get index
     * @function
     * @return {Object} index object
     */

  }, {
    key: 'getIndex',
    value: function getIndex(title) {
      return this.indexes[title];
    }

    /**
     * Search Index
     * @function
     * @param {string} query string being searched
     * @return {Object} search result is returned
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(query, title) {
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
     * get the number of objects
     */

  }, {
    key: 'documentCount',
    value: function documentCount(jsonArray) {
      this.Documents = [];
      for (var object in jsonArray) {
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

  }, {
    key: 'isValid',
    value: function isValid(fileContent) {
      if (!fileContent[0] && fileContent[0].title) {
        return false;
      }
      return true;
    }
  }, {
    key: 'isValidFile',
    value: function isValidFile(file) {
      if (!file.name.toLowerCase().match(/\.json$/)) {
        return false;
      }
      return true;
    }
  }, {
    key: 'isnotEmpty',
    value: function isnotEmpty(file) {
      if (file[0] === undefined) {
        return 'Json file is empty';
      }
      return true;
    }
  }]);

  return InvertedIndex;
}();

module.exports = InvertedIndex;