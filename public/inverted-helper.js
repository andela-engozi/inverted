class Helper {

  /**
   * removes special characters, white spaces and duplicates
   * @function
   * @param {string} text document title and text
   * @return {Array} tokens
   */
  static tokenize(text) {
    const uniqueWords = [];
    const token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
    token.forEach((item) => {
      if (!uniqueWords.includes(item)) {
        uniqueWords.push(item);
      }
    });
    return uniqueWords;
  };

  /**
   * get the number of objects
   */
  static documentCount(fileContent) {
    this.Documents = [];
    for (const content in fileContent) {
      this.Documents.push(parseInt(content));
    }
    return this.Documents;
  };

  /**
   * isValid
   * @function
   * @param {Array} fileContent
   * @return {boolean} statement is returned
   */
   static isValid(fileContent) {
    if (!fileContent[0] && fileContent[0].title) {
      return false;
    }
    return true;
  };

  static isValidFile(file) {
    if (!file.name.toLowerCase().match(/\.json$/)) {
      return false;
    }
    return true;
  };

  /**
  * checks if file content is valid
  */
  static isnotEmpty(file) {
    if(file[0] === undefined) {
      return 'Json file is empty';
    }
    return true;
  };
  /**
  * converts a string to lowercase and takes only words from it
  * @param {...string} words - varied number of arguments
  * @returns {array} returns all argument into a single array
  */
  static flatten(...words) {
    const allWords = [];
    const flatter = (...words) => {
      words.forEach((word) => {
        if (Array.isArray(word)) {
          flatter(...word);
        } else {
          allWords.push(word);
        }
      });
    };
    flatter(...words);
    return allWords;
  }
  /**
  * method checks if a word is present in an index of a file
  * @param {array} words - words to search for in a file
  * @param {string} filename - the name of the file being searched
  * @param {object} indexMap - houses the generated search index for a file
  * @returns {object} mapped object of the search result
  */
  static searchMap(words, filename, indexMap) {
    const collection = {};
    words.forEach((word) => {
      collection[word] = indexMap[filename][word];
    });
    return collection;
  }
}