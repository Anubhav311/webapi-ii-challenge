const express = require('express');
const db = require('./data/db');
const router = express.Router();

router.post('/', (req, res) => { 
    const postInformation = req.body;

    if (postInformation.title && postInformation.contents) {
        db.insert(postInformation)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })

    } else {
        res.status(400).json({errorMessage: "Please provide title and content for the post."})
    }
})

router.get('/', (req, res) => {
    db.find()
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
        .then(post => {
            console.log(post)
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        }) 
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    db.remove(postId)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"})
        })
})


module.exports = router;
