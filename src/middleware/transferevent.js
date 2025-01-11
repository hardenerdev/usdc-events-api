const validator = require('validator');

// @todo consider [express-validator](https://www.npmjs.com/package/express-validator)
const checkFilters = async (req, res, next) => {
  console.log(`? checking filters from middleware`);

  // check filters are valid
  const filters = Object.keys(req.query);
  const allowedFilters = ['from', 'to', 'initDate', 'endDate', 'minTokens', 'maxTokens'];
  const isValidFilter = filters.every((filter) => allowedFilters.includes(filter));

  if (!isValidFilter) {
    return res.status(500).send({ error: `Invalid filters.`});
  }

  if (req.query.initDate || req.query.endDate) {
    req.query.timestamp = {};
  }
  if (req.query.minTokens || req.query.maxTokens) {
    req.query.tokens = {};
  }
  
  // check from address as well formed eth address
  if (req.query.from && !validator.isEthereumAddress(req.query.from)) {
    return res.status(400).send({ error: `from is not a valid Ethereum address` });
  }
  // check to address as well formed eth address
  if (req.query.to && !validator.isEthereumAddress(req.query.to)) {
    return res.status(400).send({ error: `to is not a valid Ethereum address` });
  }
  // check initDate as well formed ISO8601 date
  if (req.query.initDate && !validator.isISO8601(req.query.initDate)) {
    return res.status(400).send({ error: `initDate is not a valid ISO8601 date` });
  } else if (req.query.initDate && validator.isISO8601(req.query.initDate)) {
    req.query.timestamp.$gte = new Date(req.query.initDate).getTime();
    delete req.query.initDate;
  }
  // check endDate as well formed ISO8601 date
  if (req.query.endDate && !validator.isISO8601(req.query.endDate)) {
    return res.status(400).send({ error: `endDate is not a valid ISO8601 date` });
  } else if (req.query.endDate && validator.isISO8601(req.query.endDate)) {
    req.query.timestamp.$lte = new Date(req.query.endDate).getTime();
    delete req.query.endDate;
  }
  // check minTokens is numeric
  if (req.query.minTokens && !validator.isNumeric(req.query.minTokens)) {
    return res.status(400).send({ error: `minTokens is not numeric` });
  } else if (req.query.minTokens && validator.isNumeric(req.query.minTokens)) {
    req.query.tokens.$gte = req.query.minTokens;
    delete req.query.minTokens;
  }
  // check maxTokens is numeric
  if (req.query.maxTokens && !validator.isNumeric(req.query.maxTokens)) {
    return res.status(400).send({ error: `maxTokens is not numeric` });
  } else if (req.query.maxTokens && validator.isNumeric(req.query.maxTokens)) {
    req.query.tokens.$lte = req.query.maxTokens;
    delete req.query.maxTokens;
  }

  next();
};

module.exports = checkFilters;
