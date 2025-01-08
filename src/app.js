const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('', async (req, res) => {
  res.status(200).send({ status: 'up and running' });
});

app.listen(PORT, () => {
  console.log(`+ app up and ready at port ${PORT}`);
});
