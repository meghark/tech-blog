const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('posts', {
		"id": 1,
		"title": "Why MVC is important",
		"content": "MVC allows developers to maintain true separation of concerns, devising their code between the model layer for data,\n                the view  layer for design, and the controller layer for application logic.",
		"user_id": 1,
		"created_at": "2022-04-30T05:37:12.000Z",
		"comment_count": 4,
		"comments": [
			{
				"id": 7,
				"note": "Excellent!",
				"user_id": 5,
				"post_id": 1,
				"createdAt": "2022-05-01T02:14:51.000Z",
				"updatedAt": "2022-05-01T02:16:06.000Z"
			},
			{
				"id": 3,
				"note": "MVC!",
				"user_id": 3,
				"post_id": 1,
				"createdAt": "2022-04-30T05:37:12.000Z",
				"updatedAt": "2022-04-30T05:37:12.000Z"
			},
			{
				"id": 2,
				"note": "Learning MVC was hard at first but once figured out its amazing",
				"user_id": 1,
				"post_id": 1,
				"createdAt": "2022-04-30T05:37:12.000Z",
				"updatedAt": "2022-04-30T05:37:12.000Z"
			},
			{
				"id": 1,
				"note": "True, agreed",
				"user_id": 2,
				"post_id": 1,
				"createdAt": "2022-04-30T05:37:12.000Z",
				"updatedAt": "2022-04-30T05:37:12.000Z"
			}
		],
		"user": {
			"id": 1,
			"username": "Jerryjone",
			"email": "test@123.com",
			"password": "12345"
		}
	});
});

module.exports = router;