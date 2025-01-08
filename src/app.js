const express = require('express');
const dotenv = require('dotenv');
const web3 = require('./services/web3');
const chainRouter = require('./routers/chain');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(chainRouter);

app.get('', async (req, res) => {
  res.status(200).send({ status: 'up and running' });
});

app.listen(PORT, () => {
  console.log(`+ app up and ready at port ${PORT}`);
});
