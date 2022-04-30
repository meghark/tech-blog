const {Comment} = require('../models');

const commentData= [
    {
        note: "True, agreed",
        user_id: "2",
        post_id:'1'
    },
    {
        note: "Learning MVC was hard at first but once figured out its amazing",
        user_id: "1",
        post_id:'1'
    },
    {
        note: 'MVC!',
        user_id:'3',
        post_id:'1'
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;