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
		client = await MongoClient.connect(process.env.MONGO_URL);
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
	it('hello world!', function() {
		assert.strictEqual(1 + 1, 2);
	});
});