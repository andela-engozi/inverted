'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var index = function () {
    function index() {
        _classCallCheck(this, index);

        this.fileMap = {};
    }

    //create index


    _createClass(index, [{
        key: 'createIndex',
        value: function createIndex(fileContent) {
            var _this = this;

            this.docCount = [];
            for (var object in fileContent) {
                //explain this
                this.docCount.push(parseInt(object, 10));
            };
            fileContent.forEach(function (item, index) {
                var content = item.title + ' ' + item.text;
                var token = _this.tokenize(content);
                token.forEach(function (item) {
                    if (item in _this.fileMap) {
                        _this.fileMap[item].push(index);
                    } else {
                        _this.fileMap[item] = [];
                        _this.fileMap[item].push(index);
                    }
                });
            });
            return this.fileMap;
        }

        //get index

    }, {
        key: 'getIndex',
        value: function getIndex() {
            return this.fileMap;
        }

        //search index

    }, {
        key: 'searchIndex',
        value: function searchIndex(query) {
            var _this2 = this;

            var result = {};
            var search = query.split(' ');
            search.forEach(function (word) {
                if (_this2.fileMap.hasOwnProperty(word)) {
                    result[word] = _this2.fileMap[word];
                }
            });

            return Object.keys(result).length > 0 ? result : 'Search Query Not Found';
        }

        //tokenize

    }, {
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
    }]);

    return index;
}();

// module.exports = index;