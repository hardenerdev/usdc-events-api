const { ethers } = require('ethers');
const dotenv = require('dotenv');
const USDC_ABI = require('../utils/abi/usdcabi');
const TransferEvent = require('../models/transferevent');
require('../utils/bigint');

dotenv.config();

const WEB3_PROVIDER = process.env.WEB3_PROVIDER || 'wss://ethereum-rpc.publicnode.com';
const WEB3_USDC_ADDRESS = process.env.WEB3_USDC_ADDRESS || '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

const provider = new ethers.WebSocketProvider(WEB3_PROVIDER);

const contract = new ethers.Contract(WEB3_USDC_ADDRESS, USDC_ABI, provider);

const parseEvent = async function (event) {
  let parsedEvent = {};

  parsedEvent.from = event.args[0];
  parsedEvent.to = event.args[1];
  parsedEvent.tokens = event.args[2];
  parsedEvent.timestamp = (await provider.getBlock(event.blockNumber)).timestamp;
  parsedEvent.address = event.address;
  parsedEvent.blockHash = event.blockHash;
  parsedEvent.blockNumber = event.blockNumber;
  parsedEvent.data = event.data;
  parsedEvent.logIndex = event.index;
  parsedEvent.removed = event.removed;
  parsedEvent.topics = event.topics;
  parsedEvent.transactionHash = event.transactionHash;
  parsedEvent.transactionIndex = event.transactionIndex;
  parsedEvent.returnValues = event.args;
  parsedEvent.event = event.fragment.name;

  return parsedEvent;
};

contract.on('Transfer', async (from, to, tokens, event) => {
  try {
    let parsedEvent = await parseEvent(event.log);
    parsedEvent.raw = event.log;

    await new TransferEvent(parsedEvent).save();
    console.log(`+ event stored into mongodb`);
  } catch (e) {
    console.log(`! something wrong when saving event to mongodb: ${e.message}`);
  }
});

module.exports = {
  ethers,
  provider,
};
