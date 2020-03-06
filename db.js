const admin = require('firebase-admin');

module.exports.addItem = function (table, id, object){
    let db = connectToDb();
    let docRef = db.collection(table).doc(id);

    docRef.set(object);
}

// addItem('config', 'test', {value: 'test'});

module.exports.fetchItem = async function (table, id){
    var data;
    await db.collection(table).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
        if (doc.id == id){
            data = doc.data();
        }
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })
    return data;
}

// fetchItem('config', 'test').then(thing => {
//     console.log(thing);
// });

module.exports.deleteItem = function (table, id){
    db.collection(table).doc(id).delete();
}

// deleteItem('config', 'test');

module.exports.updateItem = function(table, id, newValue){
        let docRef = db.collection(table).doc(id);
        let updateSingle = docRef.update(newValue);
}

function connectToDb() {

    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.DB_KEY))
    });
    return admin.firestore();
}

//updateItem('config', 'test', {value: 'test2'});
