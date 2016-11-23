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
    fileContent.forEach((item, docTag) => {
      const content = `${item.title} ${item.text}`;
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
      if (this.fileMap.hasOwnProperty(word)) {
        result[word] = this.fileMap[word];
      }
    });
    return Object.keys(result).length > 0 ? result : 'Search Query Not Found';
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
}
module.exports = index;
