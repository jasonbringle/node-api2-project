const express = require("express");
const router = express.Router();
const db = require('./db.js');

router.post('/:id/comments', (req,res) => {
    comment = req.body;
    let date = Date()
    comment.created_at = date;
    comment.updated_at = date;

    if(comment.text == 0){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        db.findById(comment.post_id)
        .then(post => {
            if(post[0].id == comment.post_id){
            db.insertComment(comment)
                .then(commentId => res.status(201).json(comment))
                .catch(err => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
                    }
                })
        .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))
        }
    }
)

router.get('/:id/comments', ( req,res ) => {
    const postComments = req.body.id;
    db.findPostComments(postComments)
    .then(comments => 
        res.status(200).json(comments))
    .catch(err => console.log(err))
})
 

module.exports = router