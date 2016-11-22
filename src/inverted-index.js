class index{
    constructor(){
      this.fileMap = {};
    }
    
    //create index
    createIndex(fileContent){
        this.indexes=[];
        this.docCount = [];
        console.log(this.docCount);
        for(const object in fileContent){
            this.docCount.push(parseInt(object,10));
        };
        fileContent.forEach((item, index)=>{
            let content = `${item.title} ${item.text}`;
            const token = this.tokenize(content);
            token.forEach((item)=>{  
                if(item in this.fileMap){
                    this.fileMap[item].push(index);
                }else{
                    this.fileMap[item] =[];
                    this.fileMap[item].push(index);
                }
            });
        });
        return this.fileMap;
        }

    //get index
    getIndex(){
        return this.fileMap;
    }

    //search index
    searchIndex(query, title){
        const queryToken = this.tokenize(query);
        const searchIndex = this.getIndex(title);

        if(!searchIndex){
            return `Index with ${title} does not exist.`;
        }

        
      
    }

    //tokenize
    tokenize(text){
        let unique =[];
        let token = text.toLowerCase().replace(/[^\w\s]/gi, '').match(/\w+/g);
        token.forEach((item)=>{
            if(!unique.includes(item)){
                unique.push(item);
            }
        });
        return unique;
    }

    isValid(filePath){
        return (['',undefined,null,isNaN].indexOf(filePath) === -1)? true: false;
    }

   readFile(filePath){
       
    }
}

// module.exports = index;