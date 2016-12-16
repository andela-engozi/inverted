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
   * create index
   * @function
   * @param {Array} fileContent objects in an Array
   * @param {title} title file title
   * @return {indexes} index object
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',
    value: function createIndex(fileContent, title) {
      var _this = this;

      this.fileMap = {};
      fileContent.forEach(function (content, index) {
        var tokens = Helper.tokenize(content.title + ' ' + content.text);
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
     * Search a particular file
     * @function
     * @param {string} query string being searched
     * @return {Object} search result is returned
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(title) {
      var _Helper,
          _this2 = this;

      if (title) {
        this.fileMap = this.indexes[title];
      }
      var result = {};

      for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        query[_key - 1] = arguments[_key];
      }

      if (query === undefined) {
        return this.fileMap;
      }
      var search = (_Helper = Helper).flatten.apply(_Helper, query);
      search.forEach(function (word) {
        if (_this2.fileMap[word]) {
          result[word] = _this2.fileMap[word];
        }
      });
      return Object.keys(result).length > 0 ? result : 'Search Query Not Found';
    }

    /**
     * Search multiple files 
     */

  }, {
    key: 'searchAllfiles',
    value: function searchAllfiles() {
      var _Helper2,
          _this3 = this;

      var search = (_Helper2 = Helper).flatten.apply(_Helper2, arguments);
      var result = {};

      var _loop = function _loop(title) {
        result[title] = {};
        var filetoSearch = _this3.indexes[title];
        search.forEach(function (word) {
          if (filetoSearch[word]) {
            result[title][word] = filetoSearch[word];
          }
        });
      };

      for (var title in this.indexes) {
        _loop(title);
      };
      return Object.keys(result).length > 0 ? result : 'Search Query Not Found';
    }
  }]);

  return InvertedIndex;
}();