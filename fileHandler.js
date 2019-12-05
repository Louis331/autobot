const fs = require('fs');

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