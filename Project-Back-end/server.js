require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const connectDb = require('./config/db');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const productsRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')
const OrderRoutes = require('./routes/orderRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(cookieParser());


const allowedOrgin = process.env.ALLOWED_ORIGINS.split(',')

const corsOptions = {
    origin:allowedOrgin,
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}

app.use(cors(corsOptions))

// connect to db

connectDb();

// User
app.use('/api', userRoutes)
app.use('/api',productsRoutes)
app.use('/api/user',cartRoutes)
app.use('/api/user' , OrderRoutes)
app.use('/api/user', wishlistRoutes)

//Admin
app.use('/api/admin' , productsRoutes)
app.use('/api/admin' , adminRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3006
app.listen(PORT , () => console.log(`🚀 Server is running on port ${PORT}`))