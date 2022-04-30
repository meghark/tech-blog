const {Post} = require('../models');

const postData =[
    {
        title:"Why MVC is important",
        content:`MVC allows developers to maintain true separation of concerns, devising their code between the model layer for data,
                the view  layer for design, and the controller layer for application logic.`,
        user_id:1
    },
    {
        title:"Authentication vs Authorization",
        content:`There is a difference between authentication and authroization. Authentication means confirming your own identity 
                whereas authorization means being allowed access to the system.`,
        user_id:1
    },
    {
        title:"Object-Relational Mapping",
        content:`I have really loved learning about ORMs. It's really simplified the way i create queries in sql!`,
        user_id:3
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;

