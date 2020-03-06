const db = require('../db.js');
class ConfigItem{
    constructor(id, value){
        this.table = process.env.CONFIG_TABLE;
        this.id = id;
        this.v = value;
    }

    addToDb(){
        db.addItem(this.table, this.id, {value: this.v});
    }

    deleteFromDb(){
        db.deleteItem(this.table, this.id);
    }

    updateDb(){
        db.updateItem(this.table, this.id, {value: this.v});
    }

}

module.exports = ConfigItem