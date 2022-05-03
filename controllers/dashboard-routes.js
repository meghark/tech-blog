
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Post, User} = require('../models');


//Dashboard will display all logged in users post.
//Use the session variable to get the user_id

router.get('/', async (req, res) => {

    if(req.session.loggedIn)
    {
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
    }
    else
    {
        res.redirect('/login');
    }
    
});

 module.exports = router;