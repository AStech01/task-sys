// const express=require('express')

// const router=express.Router()

// const Order=require('../models/Order')

// router.post('/',async(req,res)=>{
//     try {
//         const {customerId,product,quantity,price,status}=req.body;
//         const newOrder=await Order.create({customerId,product,quantity,price,status})
       
//         res.status(201).json(newOrder)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// router.get('/',async(req,res)=>{
//     try {
//         const orders=await Order.find().populate('customerId')
//         res.status(200).json(orders)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// router.get('/:id',async(req,res)=>{
//     try {
//         const order=await Order.findById(req.params.id).populate('customerId')
//         res.status(200).json(order)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// router.put('/:id',async(req,res)=>{
//     try {
//         const{customerId,product,quantity,price,status}=req.body
//         const updatedOrder=await Order.findByIdAndUpdate(req.params.id,{
//             customerId,product,quantity,price,status
//         },{new:true})
//         res.status(200).json(updatedOrder)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// router.delete('/:id',async(req,res)=>{
//     try {
//         await Order.findByIdAndDelete(req.params.id)
//         res.status(200).json({message:'order deleted'})
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

// module.exports=router



const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Customer = require('../models/Customer');

const router = express.Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

/**
 * GET /api/orders?page=&limit=
 * Returns orders with populated customer info
 */
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('status').optional().isIn(['pending', 'shipped', 'delivered'])
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1) * limit;

      const filter = {};
      if (req.query.status) filter.status = req.query.status;

      const total = await Order.countDocuments(filter);
      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('customerId', 'name email phone');

      res.json({
        data: orders,
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

/**
 * GET /api/orders/:id
 */
router.get(
  '/:id',
  [param('id').isMongoId()],
  handleValidation,
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate('customerId', 'name email phone');
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/orders
 */
router.post(
  '/',
  [
    body('customerId').isMongoId().withMessage('Valid customerId required'),
    body('product').trim().notEmpty().withMessage('Product required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
    body('status').optional().isIn(['pending', 'shipped', 'delivered'])
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const { customerId, product, quantity, price, status } = req.body;

      const customer = await Customer.findById(customerId);
      if (!customer) return res.status(400).json({ message: 'customerId does not exist' });

      const order = await Order.create({ customerId, product, quantity, price, status });
      // populate the returned object
      const populated = await order.populate('customerId', 'name email phone');
      res.status(201).json(populated);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /api/orders/:id
 */
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('customerId').optional().isMongoId(),
    body('product').optional().trim().notEmpty(),
    body('quantity').optional().isInt({ min: 1 }),
    body('price').optional().isFloat({ min: 0 }),
    body('status').optional().isIn(['pending', 'shipped', 'delivered'])
  ],
  handleValidation,
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      // if customerId change, check exists
      if (req.body.customerId && req.body.customerId !== String(order.customerId)) {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).json({ message: 'customerId does not exist' });
      }

      Object.assign(order, req.body);
      await order.save();
      const populated = await order.populate('customerId', 'name email phone');
      res.json(populated);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/orders/:id
 */
router.delete(
  '/:id',
  [param('id').isMongoId()],
  handleValidation,
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      await order.deleteOne();
      res.json({ message: 'Order deleted' });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
