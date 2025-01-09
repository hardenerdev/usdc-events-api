const mongoose = require('mongoose');

const MONGOOSE_URL = 'mongodb://mongo:27017/usdc-events-api';

mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
});
