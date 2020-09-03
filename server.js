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

    function validateBody(body) {
        return true;
    }

    if(validateBody(body)) {
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
    id = req.params.id;


})