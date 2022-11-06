const sequelize = require("../config/connection");
const {User,Post,Comment} = require("../models/");
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 6,
      min: 2
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

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
        var title = lorem.generateWords((i%3)+1);
        title = title[0].toUpperCase() + title.substring(1);
        posts.push({
            title: title,
            body: lorem.generateParagraphs(2),
            UserId: randUserId
        })
    }

    await Post.bulkCreate(posts)

    const comments = [];
    for (let i = 0; i < 15; i++){
        var randPostId = Math.floor(Math.random()*15) + 1;
        var randUserId = Math.floor(Math.random()*3) +1
        comments.push({
            body: lorem.generateParagraphs(2),
            PostId: randPostId,
            UserId: randUserId
        })
    }

    await Comment.bulkCreate(comments)

    console.log("seeded!")
    process.exit(0)
}

seed();