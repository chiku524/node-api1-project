const express = require('express')
const shortid = require('shortid')

const port = 5000;

const server = express();
server.use(express.json());

let users = [
    {
        id: shortid.generate(),
        name: 'Nico Chikuji',
        bio: 'Up and coming full-stack web developer'
    },
    {
        id: shortid.generate(),
        name: 'Ricky Bobby',
        bio: 'Fastest race car driver'
    },
    {
        id: shortid.generate(),
        name: 'Darth Vader',
        bio: 'Most evil supervillain in the atmosphere'
    }
]

server.get('/', (req, res) => {
    res.send('Hello world, from Express');
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    // function validateBody(body) {
    //     return true;
    // }

    if(userInfo) {
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo);
    } else {
        res.status(400).json({message: "the object requested is not valid, please RTFM."});
    }
})

server.get('/api/users', (req, res) => {
    res.send(users);
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const userById = users.filter(user => user.id === id);

    if(userById[0]) {
        res.send(userById)
    } else {
        res.status(404).json({message: "user not found, try a different id"})
    }
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const found = users.find(user => user.id === id);

    if(found) {
        users = users.filter(user => user.id !== id);
    } else {
        res.status(404).json({message: "user not found"});
    }
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        changes.id = id;
        users[index] = changes;
        res.status(200).json(users[index]);
    } else {
        res.status(404).json({message: "user not found"});
    }
})