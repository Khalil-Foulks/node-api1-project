const express = require("express")
const shortid = require("shortid")

const server = express();

server.use(express.json())

let users = [{ id: shortid.generate(), name: 'Khalil', bio: "this is a bio" },{ id: shortid.generate(), name: 'John', bio: "bio 2" }, { id: shortid.generate(), name: 'Doe', bio: "bio 3" }]

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
    const id = req.params.id;

    users = users.filter(u => u.id === id);

    res.status(200).json(users)
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(u => u.id !== id);

    res.status(204).end();
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = users.find(a => a.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: `There is no account with id ${id}` })
    }
});

const port = 8000;

server.listen(port, () => console.log("server running...."))