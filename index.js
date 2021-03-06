const express = require("express")
const shortid = require("shortid")
const cors = require("cors")

const server = express();

server.use(express.json())
server.use(cors())

let users = [{ id: shortid.generate(), name: 'Khalil', bio: "this is a bio" },{ id: shortid.generate(), name: 'John', bio: "bio 2" }, { id: shortid.generate(), name: 'Doe', bio: "bio 3" }]

server.post('/api/users', (req, res) => {
    const user = req.body
    user.id = shortid.generate();

    try{
        if(!user.name || !user.bio){
            res.status(400).json({ errorMessage: "Please provide a name and bio for the user." })
        } else {
            users.push(user)
            res.status(201).json(users)
        }
    } catch(err){
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
})

server.get('/api/users', (req, res) => {
    
    try{
        res.status(200).json(users)
    } catch(err){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    let found = users.find(u => u.id === id);
    
    try{
        if(found){
            res.status(200).json(found)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch(err){
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    try{
        if(users.find(u => u.id === id)){
            users = users.filter(u => u.id !== id);
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch(err){
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const user = req.body

    let found = users.find(a => a.id === id);

    try{
        if(found){
            if(!user.name || !user.bio){
                res.status(400).json({errorMessage: "Please provide a name and bio for the user."})
            } else {
                Object.assign(found, changes);
                res.status(200).json(users);
            }
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch(err){
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
});

const port = 8000;

server.listen(port, () => console.log("server running...."))