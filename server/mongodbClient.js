const { MongoClient } = require('mongodb');

let client = null;

const connectToMongoDB = async () => {
    if (!client) {
        const url = "mongodb+srv://shaikhimran115:1234@cluster0.xqe3ru1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";
        // const url = "mongodb://127.0.0.1:27017/books"
        client = new MongoClient(url);
        try {
            await client.connect();
            console.log("MongoDB Connected Successfully!");
        } catch (err) {
            console.log('Error in MongoDB ', err);
        }
    }
    return client;
}
const getCollection = async (dbName, collectionName) => {
    const db = client.db(dbName);
    return db.collection(collectionName);
}

const closeMongoDB = async () => {
    if (client) {
        await client.close();
        client = null;
        console.log('MongoDB Connection closed...');
    }
}

module.exports = {
    connectToMongoDB,
    getCollection,
    closeMongoDB
}
