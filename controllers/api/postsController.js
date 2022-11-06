const express = require('express');
const router = express.Router();
const {Post,User} = require('../../models')


router.get('/', async(req,res)=>{
    try{
        const postData = await Post.findAll();
        res.json(postData);
    }catch(err){
        res.json({message:err.message})
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const postsData = await Post.findByPk(req.params.id);
        res.json(postsData);
    }catch(err){
        res.json({message:err.message})
    }
})

router.post('/', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message: "not logged in"});
    }
    try{
        const newpostData = await Post.create({
            title:req.body.title,
            body:req.body.body,
            UserId: req.session.activeUser.id
        });
        res.status(201).json(newpostData);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put('/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message: "not logged in"});
    }
    try{
        const update =  await Post.update(req.body, {
            where:{
                id:req.params.id,
                UserId:req.session.activeUser.id
            }
        });
        if (!update){
            return res.status(401).json({message:"This is not your post. Or the post no longer exists."})
        }
        return res.json(update);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id', async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message: "not logged in"});
    }
    try{
        const delData = await Post.destroy({where:{id:req.params.id, UserId:req.session.activeUser.id}})
        res.json(delData)
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports = router;