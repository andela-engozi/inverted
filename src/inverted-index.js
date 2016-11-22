class index{
    constructor(){
      this.fileMap = {};
    }
    
    //create index
    createIndex(fileContent){
        this.docCount = [];
        for(const object in fileContent){
            //explain this
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
    searchIndex(query){
        const result = {};
        const search = query.split(' ');
        search.forEach((word) =>{
            if (this.fileMap.hasOwnProperty(word)){
                result[word] = this.fileMap[word];
            }
        });

        return Object.keys(result).length>0? result : 'Search Query Not Found';   
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

    
}

// module.exports = index;