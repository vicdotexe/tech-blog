const sequelize = require("../config/connection");
const {User,Post,Comment} = require("../models/");

const seed = async ()=> {
    await sequelize.sync({force:true});

    await User.bulkCreate([
        {
            username:"Victor",
            password:"passwordv"
        },
        {
            username:"Amanda",
            password:"passworda"
        },
        {
            username:"Eli",
            password:"passworde"
        }
    ],{
        individualHooks:true
    })

    const posts = [];
    for (let i = 0; i < 15; i++){
        var randUserId = Math.floor(Math.random()*3) +1
        posts.push({
            title: `Title ${i}`,
            body: `post body ${i}`,
            UserId: randUserId
        })
    }

    await Post.bulkCreate(posts)

    const comments = [];
    for (let i = 0; i < 15; i++){
        var randPostId = Math.floor(Math.random()*15) + 1;
        var randUserId = Math.floor(Math.random()*3) +1
        comments.push({
            body: `post body ${i}`,
            PostId: randPostId,
            UserId: randUserId
        })
    }

    await Comment.bulkCreate(comments)

    console.log("seeded!")
    process.exit(0)
}

seed();