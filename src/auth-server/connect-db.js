import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = `mongodb+srv://goodbyeWasteMain:sharkRadarRIP@goodbyewastedb.yduuwag.mongodb.net/`;
const client = new MongoClient(connectionString, {
	serverApi: {
		version: ServerApiVersion.v1,
		deprecationErrors: true
	}
});

let connection = null;

try {
	connection = await client.connect();
	
} catch (err) {
	console.error(err);
}

const db = connection?.db("gwDB") ?? null;

export default db;
