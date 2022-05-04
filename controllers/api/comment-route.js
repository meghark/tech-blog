const {User, Post, Comment} = require('../../models');
const router = require('express').Router();

router.post('/', withAuth,async (req, res) => {
    //Comments can be created by logged in user only
    if(req.session)
    {
        try{
            const result = await Comment.create ( {
                note: req.body.note,
                //User_id from session
                user_id: req.session.user_id,
                post_id: req.body.post_id
            });
    
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json(error);
        }
    }
   
});

router.put('/:id', async (req, res) => {
    try{
        const results = await Comment.update({note: req.body.note}, {
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

        const result = await Comment.destroy({
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

