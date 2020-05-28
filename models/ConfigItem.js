const db = require('../db.js');
const file = require('../fileHandler');
const fileLocation = './config.json'

class ConfigItem {
    constructor(id, value) {
        this.table = process.env.CONFIG_TABLE;
        this.id = id;
        this.v = value;
    }

    addToDb() {
        db.addItem(this.table, this.id, { value: this.v });
        this.writeToFile();
    }

    deleteFromDb() {
        db.deleteItem(this.table, this.id);
    }

    updateDb() {
        db.updateItem(this.table, this.id, { value: this.v });
        this.writeToFile();
    }

    writeToFile() {
        let currentFile = file.readFile(fileLocation);
        currentFile[this.id] = this.v;
        file.writeFile(fileLocation, currentFile);
    }

}

module.exports = ConfigItem