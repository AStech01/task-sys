// const express = require('express');
// const mongoose = require('mongoose');
// const  customerRoutes=require('./routes/customerRoutes')
// const orderRoutes=require('./routes/orderRutes')
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// app.use('/api/customers', customerRoutes)
// app.use('/api/orders',orderRoutes)
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log(' MongoDB connected successfully'))
// .catch(err => console.error(' MongoDB connection error:', err));


// app.listen(PORT, () => {
//   console.log(` Server is running on port ${PORT}`);
// });


// 

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const morgan = require('morgan');

// const customerRouter = require('./routes/customerRoutes');
// const orderRouter = require('./routes/orderRutes');
// const { errorHandler, notFound } = require('./middlewares/error');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Routes
// app.use('/api/customers', customerRouter);
// app.use('/api/orders', orderRouter);

// // Root health check
// app.get('/', (req, res) => {
//   res.send({ status: 'Server is running 🚀' });
// });

// // Error handlers
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const customerRouter = require('./routes/customerRoutes');
const orderRouter = require('./routes/orderRutes');
const { errorHandler, notFound } = require('./middlewares/error');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/customers', customerRouter);
app.use('/api/orders', orderRouter);

// Health check
app.get('/', (req, res) => {
  res.send({ status: 'Server is running 🚀' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
