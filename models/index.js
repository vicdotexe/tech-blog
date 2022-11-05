const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

User.hasMany(Post, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
User.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});

Post.belongsTo(User);

Post.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = {
    User,
    Post,
    Comment
}