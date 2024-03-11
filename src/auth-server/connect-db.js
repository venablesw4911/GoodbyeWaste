import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = `mongodb+srv://goodbyeWasteMain:sharkRadarRIP@goodbyewastedb.yduuwag.mongodb.net/`;
const client = new MongoClient(connectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        //console.log("Connected to MongoDB Atlas");
        return client.db("gwDB");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        return null;
    }
}

const db = await connectToDatabase();

export default db;
