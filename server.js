const express = require('express');
const postRouter = require('./user-router');
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send("it's working")
})


server.use('/api/posts', postRouter);

module.exports = server; 