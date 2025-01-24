const express = require('express');
const chainRouter = require('./routers/chain');
const transferEventRouter = require('./routers/transferevent');
require('./services/ethers');
require('./database/mongoose');

const app = express();

app.use(express.json());
app.use(chainRouter);
app.use(transferEventRouter);

app.get('', async (req, res) => {
  res.status(200).send({ status: 'up and running' });
});

module.exports = app;
