const { Model, DataTypes, NOW} = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    body: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: NOW,
        allowNull: false
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

module.exports=Comment