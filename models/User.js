//To create models and specify datatypes
const {Model, DataTypes} = require('sequelize');
//For database connection
const sequelize = require('../config/connection');
//For saving password as hash
const bcrypt = require('bcrypt')


class User extends Model{

    //Creating the password check method here as the current password db information is available here.
    
    checkPassword(verifyPassWord)
    {
        return   bcrypt.compareSync(verifyPassWord, this.password);
    }

}

User.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
       validate: {
           isEmail: true
       }
    },
    password: {
        //Should not be stored or returned as plain text
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[5]
        }
    }
},
{
    //Hooks are called before or after the sequelize functions.
    //Use to do special processing of data like password hashing before saving it in db.
    hooks:{
        //Run password hashing on user data received
        async beforeCreate(newUserData) {
            newUserData.password= await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },

        async beforeUpdate(updatedUserData){
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;