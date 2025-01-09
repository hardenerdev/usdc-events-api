const mongoose = require('mongoose');
const dotenv = require('dotenv');
const e = require('express');

dotenv.config();

const MONGOOSE_URL = process.env.MONGOOSE_URL || 'mongodb://mongo:27017/usdc-events-api';

mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
}).then((result) => console.log(`+ connected to mongodb`))
.catch((error) => console.log(`! error while connecting to mongodb: ${e.message}`));

