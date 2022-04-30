const sequelize = require('../../config/connection');
const {User, Post, Comment} = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try{
        const result = await Post.create ( {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.json(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', (req, res) => {
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

