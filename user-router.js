const express = require('express');
const db = require('./data/db');
const router = express.Router();

router.post('/', (req, res) => {
    const userInformation = req.body;

    if (userInformation.title && userInformation.contents) {
        db.insert(userInformation)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })

    } else {
        res.status(400).json({errorMessage: "Please provide title and content for the user."})
    }
})

router.get('/', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})


module.exports = router;
