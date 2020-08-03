const express = require("express")
const shortid = require("shortid")

const server = express();

server.use(express.json())

let users = [{ id: shortid.generate(), name: 'Khalil', bio:"this is a bio" },{ id: shortid.generate(), name: 'John', bio:"cagadfgasdfdsf" }, { id: shortid.generate(), name: 'Doe', bio:"gahhvhsgdaga" }]

server.post('/api/users', (req, res) => {
    const user = req.body
    user.id = shortid.generate();

    users.push(user)
    res.status(201).json(users)
})

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id.toLocaleLowercase();

    users = users.filter(u => u.id.toLocaleLowerCase() === id);

    res.status(200).json(users)
})

const port = 8000;

server.listen(port, () => console.log("server running...."))