const mongoose = require('mongoose');

const transferEventSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
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
    type: Number,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  logIndex: {
    type: Number,
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
    type: Number,
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
  signature: {
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
  next();
});

const TransferEvent = mongoose.model('TransferEvent', transferEventSchema);

module.exports = TransferEvent;
