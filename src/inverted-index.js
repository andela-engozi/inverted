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
  /**
  * checks if file content is valid
  */
  isnotEmpty(file) {
    if(file[0] === undefined) {
      return 'Json file is empty';
    }
    return true;
  }
}
module.exports = InvertedIndex;
