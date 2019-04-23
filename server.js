const express = require('express');
const userRouter = require('./user-router');
const server = express();

server.use(express.json());

// const userRouter = require('./user-router');

server.get('/', (req, res) => {
    res.send("it's working")
})


server.use('/api/posts', userRouter);
// server.use('/api/users', userRouter);

module.exports = server; 