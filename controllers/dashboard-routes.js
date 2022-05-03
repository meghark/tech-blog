
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Post, User} = require('../models');
const withAuth = require('../utils/auth');

//Dashboard will display all logged in users post.
//Use the session variable to get the user_id

router.get('/',withAuth,async (req, res) => {
        try{    
            let posts = await Post.findAll({
                where: {
                    user_id : req.session.user_id
                }
                ,
                attributes: ['id', 'title', 'content', 'user_id', 'created_at']
            })
        
            posts = posts.map(post => post.get({ plain: true}));
             res.render('dashboard',{
                posts, loggedIn : req.session.loggedIn
            } );
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err);
        } 
    
});

//To do : add screen and update screen route

 module.exports = router;