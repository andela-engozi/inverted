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
   * @param {Array} fileContent objects in an Array
   * @return {Object} index object
   */
  createIndex(Jsondocument, fileTitle) {
    this.fileMap = {};
    Jsondocument.forEach((JsonObject, index) => {
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
      this.indexes[fileTitle] = this.fileMap
    });
    return this.indexes
  }
  
  /**
   * Get index
   * @function
   * @return {Object} index object
   */
  getIndex(title) {
    this.indexes[title];
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
  documentCount(Jsondocument) {
    this.Documents = [];
    for (const object in Jsondocument) {
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

