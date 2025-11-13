// const mongoose=require('mongoose')
// const Order = require('./Order')

// const customerSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:
//     {
//         type:String,
//         required:true,
//         unique:true
//     },
//     phone:{
//         type:String,
//         required:true
//     }
// },{timestamps:true})

// customerSchema.pre('findOneAndDelete',async function(next){
//     try {
//          const customerId=this.getQuery()['_id']
//     await Order.deleteMany({customerId})
//     next()
//     } catch (error) {
//        next(error) 
//     }
   

// })
// module.exports=mongoose.model('Customer',customerSchema)



const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
