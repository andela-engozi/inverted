angular.module('invertedIndex', [])

.controller('indexController', ($scope) => {
    var ind = new index();
		$scope.indexNames = [];
		$scope.currentIndex = null;
		$scope.searchResult = [];
		$scope.search = () => {
      $scope.searchResult = ind.searchIndex($scope.query);
      if (typeof($scope.searchResult) === 'string') {
        return $scope.indexObject;
      } else {
        $scope.indexObject = $scope.searchResult;
      }
    }
    $scope.createIndex = (file) => {
      if (!file.name.toLowerCase().match(/\.json$/)) {
        alert('This is not a JSON file.');
        return;
      }
      const title = file.name.split('.')[0]
      const reader = new FileReader();
      reader.onloadend = (e)=>{
        try{
          setMessage = '';
          const fileContent = JSON.parse(e.target.result);
          if(!fileContent[0] && fileContent[0].title){
            alert('Invalid Json file');
            return;
          }
          $scope.create =   ind.createIndex(fileContent);
          $scope.$apply(()=>{
            this.indexing = ind.getIndex();
            $scope.indexObject = this.indexing;
            $scope.doc = ind.docCount;
          });
        }catch(ex){
          alert('Invalid JSON file.');
           }
         };
         reader.readAsBinaryString(file);
       }
     });
//document ready
document.addEventListener("DOMContentLoaded", () => {
	// Attach file upload listener
	document.getElementById('json-file')
		.addEventListener('change', function () {
			if (this.files[0]) {
				angular.element(this).scope().createIndex(this.files[0]);
			}
		});
});
