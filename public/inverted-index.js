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

            this.indexes = [];
            this.docCount = [];
            console.log(this.docCount);
            for (var object in fileContent) {
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
        value: function searchIndex(query, title) {
            var queryToken = this.tokenize(query);
            var searchIndex = this.getIndex(title);

            if (!searchIndex) {
                return 'Index with ' + title + ' does not exist.';
            }
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
    }, {
        key: 'isValid',
        value: function isValid(filePath) {
            return ['', undefined, null, isNaN].indexOf(filePath) === -1 ? true : false;
        }
    }, {
        key: 'readFile',
        value: function readFile(filePath) {}
    }]);

    return index;
}();

// module.exports = index;