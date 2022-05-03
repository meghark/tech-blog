const router = require('express').Router();
const {Post, Comment, User} = require('../models');
const sequelize = require('../config/connection');

router.get('/posts', async (req, res) => {

	try{
		const rows = await Post.findAll({
			//Attributes to return from Post table
			attributes: ['id',
			'title',
			'content',
			'user_id',
			'created_at',
			[sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id )'), 'comment_count']],
			//Related data to include
			include: [
				{model: User},
				{model: Comment}
			]
		});

		//Multiple rows returned with above code.
		//Serialize them for templates to handle
		//Using array map function to create a new array in which each object is serailized.

		let posts = rows.map((post) => post.get({ plain: true }));

		res.render('posts', {posts,
				loggedIn: req.session.loggedIn		
		});
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json(err);
	}		
});

router.get('/posts/:id', async(req, res) =>{
	try{
		if(req.session.loggedIn)
		{
			const postData = await Post.findOne({
				where: {id: req.params.id},
				include:[
					{
						model: Comment,
						as: 'comments',
						include: {
							model: User,
							attributes: ['username']
						}
					},
					{
						model: User
					}
		
				],
				order: [['comments','createdAt', 'Desc']]
			});
		
			if(!postData)
			{
				res.status(404).json({message: 'No Post found with this id'});
				return;
			}
		
			let post = postData.get({plain: true});
			res.render('single-post', {post, 
							loggedIn: req.session.loggedIn}	
			);
		}
		else
		{
			res.redirect('/login');
			return;
		}
		
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json(err);
	}		
});

router.get('/login', async(req, res) => {
	if(req.session.loggedIn){
		res.redirect('/posts');
		return;
	}
	res.render('login');
});

router.get('/signup', async(req, res) => {
	if(req.session.loggedIn){
		res.redirect('/posts');
		return;
	}
	res.render('signup');
});

module.exports = router;