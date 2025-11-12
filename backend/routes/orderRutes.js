const express=require('express')

const router=express.Router()

const Order=require('../models/Order')

router.post('/',async(req,res)=>{
    try {
        const {customerId,product,quantity,price,status}=req.body;
        const newOrder=await Order.create({customerId,product,quantity,price,status})
       
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{
    try {
        const orders=await Order.find().populate('customerId')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate('customerId')
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const{customerId,product,quantity,price,status}=req.body
        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,{
            customerId,product,quantity,price,status
        },{new:true})
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'order deleted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports=router