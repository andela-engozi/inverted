
   angular.module('invertedIndex', [])
   .controller('indexController', ($scope)=>{
        var ind = new index();
        $scope.indexNames = [];
        $scope.currentIndex = null;
        $scope.searchResult = [];
        $scope.message = '';
       // $scope.query = '';


        $scope.search =()=>{
            $scope.indexObject = ind.searchIndex($scope.query);

        }

         $scope.createIndex = (file)=>{
             if (!file.name.toLowerCase().match(/\.json$/)) {
                 setMessage('This is not a JSON file.');
                return;
             }
             const title = file.name.split('.')[0]
             const reader = new FileReader();
             
             reader.onloadend = (e)=>{
                 try{
                     setMessage = '';
                     const fileContent = JSON.parse(e.target.result);
                     if(!fileContent[0] && fileContent[0].title){
                         setMessage('Invalid Json file')
                         return;
                     }

                     //create Index
                   $scope.create =   ind.createIndex(fileContent);
                   $scope.$apply(()=>{
                     this.indexing = ind.getIndex();
                     $scope.indexObject = this.indexing;
                     $scope.doc = ind.docCount;
                     console.log($scope.doc);
                     console.log(this.indexing)
                   });
                     

                 }catch(ex){
                     setMessage('Invalid JSON file.');

                 }
             };
             reader.readAsBinaryString(file);
         }//end of create



         //serach
         $scope.search = ()=>{
             const searchWord = ind.searchIndex($scope.query, $scope.currentIndex)
             if (typeof(result) === 'string') {       
                 $scope.message = result;
             } else {
                 $scope.index = result;
                }

             $scope.query = '';
         }//end of serach
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
