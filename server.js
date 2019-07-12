const express = require('express');
const cors = require('cors');
const postRouter = require('./user-router');
const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("it's working")
})


server.use('/api/posts', postRouter);

module.exports = server; 