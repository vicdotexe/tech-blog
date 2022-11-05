const express = require('express');
const router = express.Router();
const {Post,User} = require('../models')


// the home route
router.get('/home', async(req,res)=>{
    let postsData = await Post.findAll({
        include:[User],
        order:[['createdAt','DESC']]
    });
    let plainPosts = postsData.map(post=>{return post.get({plain:"plain"})})
    console.table(plainPosts);
    res.render('home', {title:"Home", signedIn:req.session.activeUser, posts:plainPosts})
})

// the dashboard route (redirects to login route if not logged in)
router.get('/dashboard', async(req,res)=>{
    if (!req.session.activeUser){
        return res.redirect('/login')
    }
    let postsData = await Post.findAll({
        where:{UserId:req.session.activeUser.id},
        include:[User],
        order:[['createdAt','DESC']]
    });
    let plainPosts = postsData.map(post=>{return post.get({plain:"plain"})})
    res.render('dashboard', {title:"Dashboard", signedIn:req.session.activeUser, posts:plainPosts});
})

// the login route
router.get('/login', (req,res)=>{
    res.render('login', {title:"Login", signedIn:req.session.activeUser})
})

router.get('/logout', (req,res)=>{
    req.session.activeUser = null;
    res.redirect('/login');
})


module.exports = router;