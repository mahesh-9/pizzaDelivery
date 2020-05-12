const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const app = express();
//modified to enable request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(pino);
app.options('*', cors())
app.use('/uploads',express.static('uploads'))

const uri = "mongodb+srv://umamahesh9:Hello@123456@cluster0-xvce2.mongodb.net/pizzaDelivery?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

app.use(cors());
// session 
app.use(session({
    secret: 'coffee',
    resave: true,
    saveUninitialized: false
}));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/order");


app.get("/", (req,res)=> res.send("Backend healthcheck successful"))
app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
