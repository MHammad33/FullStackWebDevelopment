const express = require("express");
const app = express();
const morgan = require("morgan");

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json());

// Morgan Logger
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
morgan.token("body", (req, res) => JSON.stringify(req.body));

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        });
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        });
    }

    const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);
    res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));