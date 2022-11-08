const express = require('express');
const router = express.Router();
const {Post,User, Comment} = require('../models');
const { route } = require('./api');
const sequelize = require('sequelize');


// the home route
router.get('/home', async(req,res)=>{
    let postsData = await Post.findAll({
        include:[User, {
            model:Comment,
            include: User
        }],
        order:sequelize.literal('createdAt DESC')
    });

    const plain = JSON.parse(JSON.stringify(postsData))
    res.render('home', {title:"Home", activeUser:req.session.activeUser, posts:plain})
})

// the dashboard route (redirects to login route if not logged in)
router.get('/dashboard', async(req,res)=>{
    if (!req.session.activeUser){
        return res.redirect('/login')
    }
    let postsData = await Post.findAll({
        where:{UserId:req.session.activeUser.id},
        include:[User, {
            model:Comment,
            include: User,
            order: sequelize.literal('createdAt ASC')
        }],
        order:sequelize.literal('createdAt DESC')
    });
    let plainPosts = postsData.map(post=>{return post.get({plain:"plain"})})
    res.render('dashboard', {title:"Dashboard", activeUser:req.session.activeUser, posts:plainPosts});
})

// the login route
router.get('/login', (req,res)=>{
    res.render('login', {title:"Login", activeUser:req.session.activeUser})
})

router.get('/signup', (req,res)=>{
    res.render('signup', {title:"Sign Up"})
})

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/login')
    });
})

router.get('/newpost', (req,res)=>{
    if (!req.session.activeUser){
        return res.redirect('/login')
    }
    res.render('createpost', {title:"Create New Post", activeUser:req.session.activeUser})
})

router.get('/edit/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.redirect('/login')
    }
    const postData = await Post.findOne({where: {id:req.params.id, UserId:req.session.activeUser.id}});
    if (!postData){
        return res.redirect('/home')
    }
    const plain = postData.get({plain:true});
    res.render('editpost', {title:"Edit Post", activeUser:req.session.activeUser, post:plain})
})

router.get('*', (req,res)=>{
    res.redirect('/home');
})


module.exports = router;