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
    try{
        const newpostData = await Post.create(req.body);
        res.json(newpostData);
    }catch(err){
        res.json({message:err.message})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const delData = await Post.destroy({where:{id:req.params.id}})
        res.json(delData)
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports = router;