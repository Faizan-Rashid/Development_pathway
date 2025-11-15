import express from "express"
import morgan, { token } from "morgan"

const app = express();

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    console.log(tokens)
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : ""

    ].join(' ')
}))

const persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    return res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    const person = persons.find(p => p.id === id)

    if (!person) return res.status(404).send(`Not found`)

    return res.json(person)
})

app.get("/info", (req, res) => {
    res.send(`<div>
        <p>phone book has ${persons.length} people</p>        
        <p>${new Date(Date.now()).toString()}</p>        
        </div>`)
})

app.delete("/delete/:id", ((req, res) => {
    const { id } = req.params;
    const person = persons.find(p => p.id === id)

    if (!person) return res.status(404).send(`Not found`)
    return res.json(persons.filter(person => person.id !== id))
}))

app.post("/api/persons", ((req, res) => {
    try {
        const data = req.body;
        // console.log(data)

        if (!data.name || !data.number) return res.json({ message: "make sure to include both number and name" })

        if (persons.find((person) => data.name === person.name)) return res.json({ error: `name ${data.name} already in list` })

        const person = {
            ...data,
            id: Math.round(Math.random() * 10000)
        }
        persons.push(person);

        return res.json(person)
    } catch (error) {

    }

}))

const PORT = 3001;
app.listen(PORT, () => {
    console.log
        (`app port ${PORT}`)
})