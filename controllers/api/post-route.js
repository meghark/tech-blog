const {User, Post, Comment} = require('../../models');
const router = require('express').Router();

router.get('/',async (req, res) => {

    try{
        const rows = await Post.findAll({
            include:[{
                attributes: [
                    'id',
                    'title',
                    'content',
                    'user_id',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'vote_count']
                  ],
                model: Comment
            },
            {
                model: User
            }]
        });
        res.json(rows);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id',async (req , res) => {
    try{
        const rows = await Post.findOne({
             where: {
                id: req.params.id,
            },
            include:[ {
                model: Comment
            },
            {
                model: User 
            }]
        });
 
        if(!rows)
        {
            res.status(404).json({message: 'Post not found'});
        }

        res.json(rows);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
}   
);

router.post('/', async (req, res) => {
    try{
        const result = await Post.create ( {
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        });

        res.json(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const results = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(!results)
        {
            res.status(404).json({message: 'Record not found for update'});
            return;
        }

        res.json(results);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
 }   
);

router.delete('/:id', async (req, res) => {

    try{

        const result = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!result)
        {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.json(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;

