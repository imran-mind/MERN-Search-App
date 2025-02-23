
const express = require('express');
const app = express();
const PORT = 8080;
const { ObjectId } = require('mongodb');
const cors = require('cors');
const { connectToMongoDB, getCollection } = require('./mongodbClient');
const dbName = 'ecommerce';
app.use(cors());
app.get('/ping', (req, res) => res.send('PONG'));

const initApp = async () => {
    await connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`App is running on ${PORT}`);
    })
}

app.get('/products/:id', async (req, res) => {
    try {
        const collectionName = 'products_v1';
        const { id } = req.params;
        console.log(id);
        const productCollection = await getCollection(dbName, collectionName);
        const result = await productCollection.findOne({ _id: new ObjectId(id) });
        console.log(result);
        res.status(200).json({ data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
});

app.get('/search', async (req, res) => {
    try {
        const collectionName = 'products_v1';
        const { query } = req.query;
        console.log(query);
        const productCollection = await getCollection(dbName, collectionName);
        const aggregationPipeline = [
            {
                $search: {
                    index: "product_autocomplete",
                    autocomplete: {
                        query: query,
                        path: "productName",
                    },
                },
            },
            {
                $limit: 5,
            }
        ]
        const results = await productCollection.aggregate(aggregationPipeline).toArray();
        res.status(200).json({ data: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

initApp();
