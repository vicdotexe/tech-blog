const express = require('express');
const router = express.Router();
const {User} = require('../../models')
const bcrypt = require('bcrypt');

router.get('/', async(req,res)=>{
    try{
        const usersData = await User.findAll();
        res.json(usersData);
    }catch(err){
        res.json({message:err.message})
    }

})

router.get('/:id', async(req,res)=>{
    try{
        const usersData = await User.findByPk(req.params.id);
        res.json(usersData);
    }catch(err){
        res.json({message:err.message})
    }
})

router.post('/', async(req,res)=>{
    try{
        const newUserData = await User.create(req.body);
        res.json(newUserData);
    }catch(err){
        res.json({message:err.message})
    }
})

router.post('/login', async(req,res)=>{
    const user = await User.findOne({where:{username:req.body.username}});
    if (!user){
        return res.status(401).json({message:"invalid credentials"});
    }
    const match = bcrypt.compareSync(req.body.password, user.password);
    console.log(user.password);
    console.log(match);

    if (!match){
        return res.status(401).json({message:"invalid credentials"});
    }
    req.session.activeUser = {
        username: req.body.username,
        id: user.id
    }
    return res.json({message:"logged in"})
})

module.exports = router;