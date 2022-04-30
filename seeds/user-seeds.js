const {User} = require('../models');

const userData =[
    {
        username:"Jerryjone",
        email:'test@123.com',
        password:'12345'
    },
    {
        username:"Tarrmason",
        email:'test1@123.com',
        password:'12345'
    },
    {
        username:"drewbarry",
        email:'test2@123.com',
        password:'12345'
    },
    {
        username:"jennahagen",
        email:'test3@123.com',
        password:'12345'
    },
    {
        username:"barrycooper",
        email:'test4@123.com',
        password:'12345'
    }

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;