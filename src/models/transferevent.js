const mongoose = require('mongoose');

const transferEventSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
  },
  from: {
    type: String,
    trim: true,
  },
  to: {
    type: String,
    trim: true,
  },
  tokens: {
    type: String,
    trim: true,
  },
  timestamp: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  blockHash: {
    type: String,
    required: true,
  },
  blockNumber: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  logIndex: {
    type: String,
    required: true,
  },
  removed: {
    type: Boolean,
    required: true,
  },
  topics: {
    type: Array,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  transactionIndex: {
    type: String,
    required: true,
  },
  returnValues: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  raw: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  timestamps: true,
});

transferEventSchema.pre('save', function (next) {
  const event = this;
  event.id = `${event.blockHash},${event.transactionHash},${event.logIndex}`;
  event.from = event.returnValues.from;
  event.to = event.returnValues.to;
  event.tokens = event.returnValues.tokens;
  next();
});

const TransferEvent = mongoose.model('TransferEvent', transferEventSchema);

module.exports = TransferEvent;
