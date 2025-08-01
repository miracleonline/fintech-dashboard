const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); 
let mongo; 
beforeAll(async () => { 
mongo = await MongoMemoryServer.create(); 
const uri = mongo.getUri().toString(); 
await mongoose.connect(uri, { 
useNewUrlParser: true, 
useUnifiedTopology: true, 
}); 
}); 
afterAll(async () => { 
await mongoose.connection.dropDatabase(); 
await mongoose.connection.close(); 
await mongo.stop(); 
}); 
afterEach(async () => { 
const collections = mongoose.connection.collections; 
for (let key in collections) { 
await collections[key].deleteMany({}); 
} 
});