// const express=require('express')

// const router=express.Router()

// const Customer=require('../models/Customer')

// router.post('/',async(req,res)=>{
//     try {
//         const {name,email,phone}=req.body;
//         const  newCustomer=new Customer({name,email,phone})
//         const savedCustomer= await newCustomer.save()
//         res.status(201).json(savedCustomer)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// router.get('/',async(req,res)=>{
//     try {
//         const customers=await Customer.find()
//         res.status(200).json(customers)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// router.get('/:id',async(req,res)=>{
//     try {
//         const customer=await Customer.findById(req.params.id)
//         if (!customer) return res.status(404).json({ message: 'Customer not found' })
//         res.status(200).json(customer)
//     } catch (error) {
//         res.status(500).json({message:error.messaeg})
//     }
// })

// router.put('/:id',async(req,res)=>{
//   try {
//      const {name,email,phone}=req.body
//      const updatedCustomer=await Customer.findByIdAndUpdate(req.params.id,
//         {name,email,phone},
//         {new:true})
//          if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' })
//         res.status(200).json(updatedCustomer)
//   } catch (error) {
//     res.status(500).json({message:error.messaege})
//   }

// })


// router.delete('/:id',async(req,res)=>{
//     try {
//         await Customer.findByIdAndDelete(req.params.id)
//         res.status(200).json({message:'customer deleted'})
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// module.exports=router


const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

const router = express.Router();


const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt()
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1) * limit;
      const total = await Customer.countDocuments();
      const customers = await Customer.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      res.json({
        data: customers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      next(err);
    }
  }
);


router.get(
  '/:id',
  [param('id').isMongoId()],
  handleValidation,
  async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).json({ message: 'Customer not found' });

      const orders = await Order.find({ customerId: customer._id }).sort({ createdAt: -1 });
      res.json({ customer, orders });
    } catch (err) {
      next(err);
    }
  }
);


router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('phone').trim().notEmpty().withMessage('Phone is required')
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const exists = await Customer.findOne({ email: email.toLowerCase() });
      if (exists) return res.status(409).json({ message: 'Email already exists' });

      const customer = await Customer.create({ name, email, phone });
      res.status(201).json(customer);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('name').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    body('phone').optional().trim().notEmpty()
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).json({ message: 'Customer not found' });

    
      if (req.body.email && req.body.email.toLowerCase() !== customer.email) {
        const exists = await Customer.findOne({ email: req.body.email.toLowerCase() });
        if (exists) return res.status(409).json({ message: 'Email already exists' });
      }

      Object.assign(customer, req.body);
      await customer.save();
      res.json(customer);
    } catch (err) {
      next(err);
    }
  }
);


router.delete(
  '/:id',
  [param('id').isMongoId()],
  handleValidation,
  async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).json({ message: 'Customer not found' });

      // delete orders referencing this customer
      await Order.deleteMany({ customerId: customer._id });

      await customer.deleteOne(); // remove customer
      res.json({ message: 'Customer and related orders deleted' });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
