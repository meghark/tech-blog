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

		res.render('posts', {posts});
	}
	catch(err)
	{
		console.log(err);
		res.status.json(err);
	}		
});


router.get('/login', async(req, res) => {
	if(req.session.loggedIn){
		res.redirect('/posts');
		return;
	}
	res.render('login');
});

module.exports = router;