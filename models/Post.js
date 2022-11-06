const { Model, DataTypes, NOW} = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Post extends Model {}

Post.init({
    // add properites here, ex:
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull:false
    },                
    createdAt: {
        type: DataTypes.DATE,                 
      get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        }
    },
    updatedAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
        }
    }
},{
    sequelize
});

module.exports=Post