const express=require('express')

const router=express.Router()

const Customer=require('../models/Customer')

router.post('/',async(req,res)=>{
    try {
        const {name,email,phone}=req.body;
        const  newCustomer=new Customer({name,email,phone})
        const savedCustomer= await newCustomer.save()
        res.status(201).json(savedCustomer)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{
    try {
        const customers=await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const customer=await Customer.findById(req.params.id)
        if (!customer) return res.status(404).json({ message: 'Customer not found' })
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({message:error.messaeg})
    }
})

router.put('/:id',async(req,res)=>{
  try {
     const {name,email,phone}=req.body
     const updatedCustomer=await Customer.findByIdAndUpdate(req.params.id,
        {name,email,phone},
        {new:true})
         if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' })
        res.status(200).json(updatedCustomer)
  } catch (error) {
    res.status(500).json({message:error.messaege})
  }

})


router.delete('/:id',async(req,res)=>{
    try {
        await Customer.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'customer deleted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports=router