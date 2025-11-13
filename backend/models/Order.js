// const mongoose=require('mongoose')

// const orderSchema=new mongoose.Schema({
//     customerId:
//      { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
//     product:{
//         type:String,
//         required:true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     status:{
//         type:String,
//         enum:['pending','shipped', 'delivered']
//     }
// },{timestamps:true})

// module.exports=mongoose.model('Order',orderSchema)


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  product: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    
  },
  price: {
    type: Number,
    required: true,
    
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
