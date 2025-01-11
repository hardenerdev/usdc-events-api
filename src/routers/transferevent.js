const express = require('express');
const TransferEvent = require('../models/transferevent');
const checkFilters = require('../middleware/transferevent');

const transferEventRouter = new express.Router();

transferEventRouter.get('/events/transfer/filter', checkFilters, async (req, res) => {
  const results = await TransferEvent.find(req.query);

  if (!results) {
    return res.status(404).send();
  }

  res.status(200).send(results);
});

transferEventRouter.get('/events/transfer/:id', async (req, res) => {
  try {
    const event = await TransferEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).send();
    }

    res.status(200).send(event);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = transferEventRouter;
