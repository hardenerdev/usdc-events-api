const express = require('express');
const TransferEvent = require('../models/transferevent')

const transferEventRouter = new express.Router();

transferEventRouter.get('/events/transfer/filter', async (req, res) => {
  const filters = Object.keys(req.query);
  const allowedFilters = ['from', 'to'];
  const isValidFilter = filters.every((filter) => allowedFilters.includes(filter));

  if (!isValidFilter) {
    return res.status(500).send({ error: `Invalid filters.`})
  }

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
