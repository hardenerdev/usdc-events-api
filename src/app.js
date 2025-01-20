const express = require('express');
const dotenv = require('dotenv');
const chainRouter = require('./routers/chain');
const transferEventRouter = require('./routers/transferevent');
require('./services/ethers');
require('./subscribers/transferevent');
require('./database/mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(chainRouter);
app.use(transferEventRouter);

app.get('', async (req, res) => {
  res.status(200).send({ status: 'up and running' });
});

app.listen(PORT, () => {
  console.log(`+ app up and ready at port ${PORT}`);
});
