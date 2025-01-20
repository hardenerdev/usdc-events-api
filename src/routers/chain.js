const express = require('express');
const { provider } = require('../services/ethers');

const chainRouter = new express.Router();

chainRouter.get('/chain/id', async (req, res) => {
  const chainId = await provider.getNetwork();

  if (!chainId) {
    return res.status(404).send();
  }

  res.status(200).send({ chainId });
});

chainRouter.get('/chain/blocknumber', async (req, res) => {
  const blockNumber = await provider.getBlockNumber();

  if (!blockNumber) {
    return res.status(404).send();
  }

  res.status(200).send({ blockNumber });
});

module.exports = chainRouter;
