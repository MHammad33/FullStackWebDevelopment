const mongoose = require('mongoose');
require('dotenv').config();

const password = process.argv[2];
const MONGODB_URI = `mongodb+srv://hammadafzal1111:${password}@cluster0.dfk59ra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log('MongoDB Connection String:', MONGODB_URI);

mongoose.set('strictQuery', false);

const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'phonebook',
        });
        console.log('Connected to mongodb database successfully!');
    } catch (err) {
        console.log(err)
    }
}
connectDatabase();

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

console.log('Schema defined...');

const Person = mongoose.model('Person', personSchema);
console.log('Model created...');

const saveInDb = async () => {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name,
        number,
    })

    const result = await person.save();
    console.log('Person saved...', result);

    mongoose.connection.close();
    console.log('Connection closed...');
}




const fetchFromDb = async () => {
    const persons = await Person.find({});
    console.log('Persons:', persons);

    mongoose.connection.close();
    console.log('Connection closed...');
}

if (process.argv.length === 5) {
    saveInDb();
} else if (process.argv.length === 3) {
    fetchFromDb();
} else {
    console.log('Invalid arguments...');
    mongoose.connection.close();
    console.log('Connection closed...');
}



