const fs = require('fs');
//TODO remove this and replace with db connections
class fileHandler{
    static writeFile(fileLocation, contents){
        fs.writeFile(fileLocation, JSON.stringify(contents), (err) =>{
            if (err) console.log(err);
        });
    }

    static readFile(fileLocation){
        return require(fileLocation)
    };
}

module.exports = fileHandler;