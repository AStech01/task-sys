const express = require('express');
const mongoose = require('mongoose');
const  customerRoutes=require('./routes/customerRoutes')
const orderRoutes=require('./routes/orderRutes')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/customers', customerRoutes)
app.use('/api/orders',orderRoutes)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected successfully'))
.catch(err => console.error(' MongoDB connection error:', err));


app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
