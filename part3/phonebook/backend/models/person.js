const mongoose = require('mongoose');
require('dotenv').config();


const MONGODB_URI = process.env.MONGODB_URI;
console.log("Connecting to MongoDB...");
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    dbName: 'phonebook',
}).then(() => {
    console.log('Connected to mongodb database successfully!');
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});


module.exports = mongoose.model('Person', personSchema);