/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;
// console.log('Connecting to MongoDB...', MONGODB_URI);
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  dbName: 'phonebook',
}).then(() => {
  console.log('Connected to mongodb database successfully!');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const transformedObject = {
      ...returnedObject,
      id: returnedObject._id.toString(),
    };
    delete transformedObject._id;
    delete transformedObject.__v;
    return transformedObject;
  },
});

module.exports = mongoose.model('Person', personSchema);
