const filterValidationSchema = {
  from: {
    trim: true,
    optional: true,
    isEthereumAddress: true,
    errorMessage: 'from is not an valid ethereum address',
  },
  to: {
    trim: true,
    isEthereumAddress: true,
    optional: true,
    errorMessage: 'to is not an valid ethereum address',
  },
  initDate: {
    trim: true,
    isISO8601: true,
    optional: true,
    errorMessage: 'initDate is not an ISO8601 compatible date',
  },
  endDate: {
    trim: true,
    isISO8601: true,
    optional: true,
    errorMessage: 'endDate is not an ISO8601 compatible date',
  },
  minTokens: {
    trim: true,
    isNumeric: true,
    optional: true,
    errorMessage: 'minTokens is not numeric',
  },
  maxTokens: {
    trim: true,
    isNumeric: true,
    optional: true,
    errorMessage: 'minTokens is not numeric',
  },
};

module.exports = filterValidationSchema;
