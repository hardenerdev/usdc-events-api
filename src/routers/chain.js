const express = require('express');
const web3 = require('../services/web3');

const chainRouter = new express.Router();

chainRouter.get('/chain/id', async (req, res) => {
  const chainId = await web3.eth.getChainId();

  if (!chainId) {
    return res.status(404).send();
  }

  res.status(200).send({ chainId });
});

chainRouter.get('/chain/blocknumber', async (req, res) => {
  const blockNumber = await web3.eth.getBlockNumber();

  if (!blockNumber) {
    return res.status(404).send();
  }

  res.status(200).send({ blockNumber });
});

module.exports = chainRouter;
