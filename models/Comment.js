const { Model, DataTypes, NOW} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    body: {
        type: DataTypes.STRING,
        allowNull:false
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: NOW,
        allowNull: false
    },
},{
    sequelize
});

module.exports=Comment