const express = require("express");
const router = express.Router();
const db = require('./db.js');

router.get('/posts', ( req, res )=> {
    db.find(req.query)
    .then(db => 
        res.status(200).json(db)
    )
    .catch(err => console.log(err))
})

router.post('/posts', ( req, res ) => {
    const post = req.body;
    let date = Date()
    post.created_at = date;
    post.updated_at = date;

    try{
        if (!post.title.length || !post.contents.length ){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
        } else {
        db.insert(post)
        .then(id => 
            db.findById(id.id)
            .then(content => 
                res.status(200).json(content))
                .catch(err => 
                    res.status(202).json({errorMessage: "Your post was accepted but could not be displayed at this time."})))
        .catch(err => err)
        } 
        } catch (err){res.status(500).json({ error: "There was an error while saving the post to the database" })}
    }
)

router.get('/posts/:id', ( req,res ) => {
    const postId = req.body.id;
    db.findById(postId)
    .then(post => 
        res.status(200).json(post)
        )
    .catch(err => console.log(err))
})

router.delete('/posts/:id', ( req, res ) => {
    const deleted = req.body.id
    db.findById(deleted)
    .then(post => 
        res.status(200).json(post))
    .catch(err => console.log(err))

    db.remove(deleted)
    .then(deleted => 
        res.status(200).json(deleted))
    .catch(err => console.log(err))
})

router.put('/posts/:id', ( req, res) => {
    const post = req.body;
    const postId = req.body.id;
    post.updated_at = Date();
    console.log(post)

    db.update(postId, post)
    .then(post => {if(post == 1){ res.status(200).json("You have updated this post!")
        }else { res.status(400).json("This Post has not been updated")}
        }
    )
    .catch(err => console.log(err))
})

module.exports = router