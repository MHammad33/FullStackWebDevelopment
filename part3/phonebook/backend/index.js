const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();

// Models
const Person = require("./models/person");
const { log } = require("console");

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "dist")));

// Morgan Logger
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
morgan.token("body", (req, res) => JSON.stringify(req.body));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.get("/api/persons", async (req, res) => {
    const persons = await Person.find({});
    res.json(persons);
})

app.get("/api/persons/:id", async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.post("/api/persons", async (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        });
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return res.status(400).json({
    //         error: "name must be unique"
    //     });
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    const result = await person.save();
    res.json(result);
});

app.put("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const person = persons.find(person => person.id === id);
    if (!person) {
        return res.status(404).end();
    }

    const updatedPerson = { ...person, number: body.number };
    persons = persons.map(person => person.id !== id ? person : updatedPerson);
    res.json(updatedPerson);
});


app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log("Id, ", id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.get("/api/info", (req, res) => {
    const date = new Date();
    const msg = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
    res.send(msg);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));