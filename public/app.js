angular.module('invertedIndex', [])
.controller('indexController', ($scope) => {
  const helper = new Helper();
  const index = new InvertedIndex();
  $scope.fileTitles = [];
  $scope.fileData = [];
  $scope.formData = '';
  $scope.documentCounter = {};
  $scope.fileIndex = '';
  $scope.currentIndex = {};
  $scope.showButton = false;
  $scope.showUploadedFiles = () => {
    $scope.showButton = true;
  }
  /**
   * check if file is valid
   */
  $scope.isValid = (fileName) => {
    if (fileName.toLowerCase().match(/\.json$/)) {
        return true;
      }
      else { return false}   
  }

  /**
   * Check if file is valid
   */
    $scope.isValidContent = (fileContent) => {
      if(fileContent[0] && fileContent[0].title) { return false }
      return true;
    }
  
  /**
   * Read uploaded files
   */
    $scope.readFile = (filePath, fileName) => {
      if (!$scope.isValid(fileName)) { alert ('Invalid json file here'); }
      else {
        const title = fileName.split('.')[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
          try {
            const fileContent = JSON.parse(e.target.result);
            $scope.$apply( () => {
              $scope.showButton = true;
              $scope.documentCounter[title] = Helper.documentCount(fileContent);
              $scope.fileIndex = index.createIndex(fileContent, title);
              $scope.fileTitles.push(title);   
            })     
          }catch(error) {
            alert (error);
          }
        }
        reader.readAsText(filePath);
      }   
    }

  /**
   * create index
   */
    $scope.createIndex = (title) => {
      $scope.formData = index.getIndex(title);
      $scope.documents = $scope.documentCounter[title];
      $scope.currentIndex = {};
      $scope.currentIndex[title] = $scope.formData;
    }

    $scope.search = () => {
      $scope.showButton = false;
      $scope.documents = $scope.documentCounter[$scope.title]
      if($scope.title === 'all') {
        const terms = $scope.query.toLowerCase().match(/\w+/g);
        $scope.currentIndex = index.searchAllfiles(terms);
      }
      else{
        const terms = $scope.query.toLowerCase().match(/\w+/g);
        $scope.searchResult = index.searchIndex($scope.title,terms);
        $scope.currentIndex = {}
        $scope.currentIndex[$scope.title] = $scope.searchResult;
      }
    }

  });
/**
 * file upload
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('json-file')
  .addEventListener('change', (e) => {
    let filePath = e.target.files[0];
    let fileName = e.target.files[0].name;
    angular.element(document.getElementById('json-file'))
      .scope().readFile(filePath, fileName)
  });
  
});

