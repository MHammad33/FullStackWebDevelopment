const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = (error, req, res, next) => {
  // console.log(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  return next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Models
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'dist')));

// Morgan Logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
morgan.token('body', (req) => JSON.stringify(req.body));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line consistent-return
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  // if (persons.find(person => person.name === body.name)) {
  //     return res.status(400).json({
  //         error: "name must be unique"
  //     });
  // }

  const person = new Person({
    name,
    number,
  });

  try {
    const result = await person.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.put('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;

  const person = {
    name,
    number,
  };

  try {
    const result = await Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get('/api/info', async (req, res) => {
  const date = new Date();
  const totalPeople = await Person.find({});
  const msg = `<p>Phonebook has info for ${totalPeople.length} people</p><p>${date}</p>`;
  res.send(msg);
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
