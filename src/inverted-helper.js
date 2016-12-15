class Helper {

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
  };

  /**
   * get the number of objects
   */
  documentCount(jsonArray) {
    this.Documents = [];
    for (const object in jsonArray) {
      this.Documents.push(parseInt(object));
    }
    return this.Documents;
  };

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
  };

  isValidFile(file) {
    if (!file.name.toLowerCase().match(/\.json$/)) {
      return false;
    }
    return true;
  };

  /**
  * checks if file content is valid
  */
  isnotEmpty(file) {
    if(file[0] === undefined) {
      return 'Json file is empty';
    }
    return true;
  };
  
}