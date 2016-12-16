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
   * create index
   * @function
   * @param {Array} fileContent objects in an Array
   * @param {title} title file title
   * @return {indexes} index object
   */
  createIndex(fileContent, title) {
    this.fileMap = {};
    fileContent.forEach((content, index) => {
      const tokens = Helper.tokenize(`${content.title} ${content.text}`);
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
   * Search a particular file
   * @function
   * @param {string} query string being searched
   * @return {Object} search result is returned
   */
  searchIndex(title,...query) {
    if(title){
      this.fileMap = this.indexes[title];
    }
    const result = {};
    if (query === undefined) {
      return this.fileMap;
    }
    const search = Helper.flatten(...query);
    search.forEach((word) => {
      if (this.fileMap[word]) {
        result[word] = this.fileMap[word];
      }
    });
    return Object.keys(result).length > 0 ? result : 'Search Query Not Found';
  }

/**
 * Search multiple files 
 */
  searchAllfiles(...query) {
    const search = Helper.flatten(...query);
    const result = {};
    for (const title in this.indexes) {
      result[title] = {};
      const filetoSearch = this.indexes[title];
      search.forEach((word) => {
        if (filetoSearch[word]) {
          result[title][word] = filetoSearch[word];
        }
      });
    };
    return Object.keys(result).length > 0 ? result : 'Search Query Not Found';

  }
}

