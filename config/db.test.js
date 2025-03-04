require('dotenv').config();
const { MongoClient } = require('mongodb');
const assert = require('assert');

let client;
let db;

before(async function() {
	if (!process.env.MONGO_URL) {
		console.error('MONGO_URL environment variable is not set');
		process.exit(1);
	}
	
	try {
		client = await MongoClient.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		db = client.db('adventure-task');
		console.log('Connected to MongoDB for testing');
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error);
		process.exit(1);
	}
});

after(async function() {
	if (client) {
		await client.close();
		console.log('MongoDB connection closed');
	}
});

describe('Database tests', function() {
	it('should insert a document into collection', async function() {
		const collection = db.collection('testCollection');
		const result = await collection.insertOne({ name: 'test', value: 1 });
		assert.strictEqual(result.acknowledged, true);
		assert.ok(result.insertedId);
	});

	it('should find a document in collection', async function() {
		const collection = db.collection('testCollection');
		const doc = await collection.findOne({ name: 'test' });
		assert.strictEqual(doc.name, 'test');
		assert.strictEqual(doc.value, 1);
	});

	it('should delete a document from collection', async function() {
		const collection = db.collection('testCollection');
		const result = await collection.deleteOne({ name: 'test' });
		assert.strictEqual(result.deletedCount, 1);
	});
});