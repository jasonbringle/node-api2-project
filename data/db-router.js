const express = require("express");
const router = express.Router();
const db = require('./db.js');

router.get('/posts', ( req, res )=> {
    db.find(req.query)
    .then(db => 
        res.status(200).json(db)
    )
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
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
    const { id } = req.params
    db.findById(id)
        .then(post => 
            {if(post[0].id == id){
                db.findById(id)
                    .then(post => 
                    res.status(200).json(post)
                    )
                    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
                    }})
        .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))
})

router.delete('/posts/:id', ( req, res ) => {
    const deleted = req.body.id
    const { id } =req.params

    db.findById(id)
    .then(post => {
        if(post[0].id == id){
            db.remove(id)
                .then(num => 
                    res.status(200).json(`There was ${num} record deleted!` ))
                .catch(err => res.status(500).json({ error: "The post could not be removed" }))
            } else { res.status(200).json({ message: 'if test did not work properly'})}
        }
        )
    .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))

    
})

router.put('/posts/:id', ( req, res) => {
    const post = req.body;
    const postId = req.body.id;
    post.updated_at = Date();


    if(post.title.length !== 0 && post.contents.length !== 0)
        {
        db.findById(postId)
        .then(postx => {
            if(postx[0].id == postId){
                db.update(postId, post)
                    .then(response => {
                        if(response == 1){ res.status(200).json(post)
                        } else { 
                        res.status(200).json("This Post has not been updated")}})
                    .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
                
                } else { res.status(200).json({ message: 'if test did not work properly'})}
            }
            )
        .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }


    
})

module.exports = router