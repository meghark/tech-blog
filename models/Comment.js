//To create models and specify datatypes
const {Model, DataTypes} = require('sequelize');
//For database connection
const sequelize = require('../config/connection');
//For saving password as hash
const bcrypt = require('bcrypt')


class Comment extends Model{

}

Comment.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
           model: 'user',
           key: 'id'
       }
    },
   post_id: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
           model:'post',
           key: 'id'
       }
   }
},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = User;