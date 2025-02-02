const { checkSchema, validationResult } = require('express-validator');
const filterValidationSchema = require('../schemas/filtervalidation');

const checkFilters = async (req, res, next) => {
  console.log(`? checking filters from middleware`);

  // check filters are valid
  const filters = Object.keys(req.query);
  const allowedFilters = ['from', 'to', 'initDate', 'endDate', 'minTokens', 'maxTokens'];
  const isValidFilter = filters.every((filter) => allowedFilters.includes(filter));

  if (!isValidFilter) {
    return res.status(500).send({ error: `Invalid filters.` });
  }

  // express validation
  await checkSchema(filterValidationSchema).run(req);
  const results = validationResult(req);

  if (!results.isEmpty()) {
    return res.status(400).send({ errors: results.array() });
  }

  // date and tokens filters if needed
  if (req.query.initDate || req.query.endDate) {
    req.query.timestamp = {};

    if (req.query.initDate) {
      req.query.timestamp.$gte = new Date(req.query.initDate).getTime();
      delete req.query.initDate;
    }
    if (req.query.endDate) {
      req.query.timestamp.$lte = new Date(req.query.endDate).getTime();
      delete req.query.endDate;
    }
  }
  if (req.query.minTokens || req.query.maxTokens) {
    req.query.tokens = {};

    if (req.query.minTokens) {
      req.query.tokens.$gte = req.query.minTokens;
      delete req.query.minTokens;
    }
    if (req.query.maxTokens) {
      req.query.tokens.$lte = req.query.maxTokens;
      delete req.query.maxTokens;
    }
  }

  next();
};

module.exports = checkFilters;
