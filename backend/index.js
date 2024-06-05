require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const RouteUser = require('./routes/user.routes');
const coffeeMenuRoutes = require('./routes/coffeeMenuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((e) => console.error('Database connection error:', e));

app.use(cors());
app.use(bodyParser.json());

app.use('/user', RouteUser);
app.use('/menu', coffeeMenuRoutes);
app.use('/orders', orderRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT);
});
