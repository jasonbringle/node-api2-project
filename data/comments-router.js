const express = require("express");
const router = express.Router();
const db = require('./db.js');

router.post('/:id/comments', (req,res) => {
    comment = req.body;
    let date = Date()
    comment.created_at = date;
    comment.updated_at = date;

    if(!comment.text){
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        } else {
            db.insertComment(comment)
            .then(response => {
                console.log(response)
                if(response.post_id == comment.post_id){
                    db.findCommentById(response.id)
                    .then(comment => 
                        res.status(201).json(comment)
                        )
                    .catch(err => 
                        err.status(500).json({ error: "There was an error while saving the comment to the database" })
                        )
                    }{ res.status(500).json({message: "The post with the specified ID does not exist."}) }
                }
            )
            .catch(err => res.status(500).json({ message: "sdfsdf" }))
        }
})

router.get('/:id/comments', ( req,res ) => {
    const postComments = req.body.id;
    db.findPostComments(postComments)
    .then(comments => 
        res.status(200).json(comments))
    .catch(err => console.log(err))
})
 

module.exports = router