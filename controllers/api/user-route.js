const req = require('express/lib/request');
const {User, Post, Comment} = require('../../models');
const router = require('express').Router();

router.get('/',async (req, res) => {

    try{
        const rows = await User.findAll({
            attributes:{exclude: ['password']}
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
        const rows = await User.findOne({
            attributes:{exclude: ['password']},
            where: {
                id: req.params.id,
            }   
        });

        if(!rows)
        {
            res.status(404).json({message: 'User not found'});
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
        const result = await User.create ( {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        //After creating the user record, add a session for the user in.
        //save() creates the session and executes the rest of steps in callback
        req.session.save(() => {
            req.session.user_id = result.id,
            req.session.username = result.username;
            req.session.loggedIn = true;

            res.json(result);
        });
        
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

//Login route is defined below.
//Using a POST here so user credentials are passed via request body rather than as url parameters.

router.post('/login', async (req, res) => {
    try{
        let rows = await User.findOne({
            where: {
                email: req.body.email
            }
        });
    
        if(!rows)
        {
            res.status(404).json({message: 'User not found'});
            return;
        }

        let validUser = await rows.checkPassword(req.body.password);

        if(!validUser)
        {
            res.status(400).json({message: "Login failed"});
            return;
        }

        req.session.save(() =>{
            req.session.user_id = rows.id;
            req.session.username = rows.username;
            req.session.loggedIn = true;

            res.json({user: rows, message: 'You are logged in'}); 
        });
       
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    };  

});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn)
    {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else
    {
        res.status(404).end();
    }
});

router.put('/:id',async (req, res) => {
    try{
        const results = await User.update(req.body, {
            //This will load all instances that are updated into memory and run the beforeUpdate hook
            //Other wise update hook wont be fired for each individual record.
            individualHooks: true,
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

