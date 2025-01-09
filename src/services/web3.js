const { Web3, WebSocketProvider } = require('web3');
const dotenv = require('dotenv');
const USDC_ABI = require('../utils/abi/usdcabi');
const TransferEvent = require('../models/transferevent');
require('../utils/bigint');

dotenv.config();

const WEB3_PROVIDER = process.env.WEB3_PROVIDER || 'wss://ethereum-rpc.publicnode.com';
const WEB3_USDC_ADDRESS = process.env.WEB3_USDC_ADDRESS || '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

const web3 = new Web3(
  new WebSocketProvider(WEB3_PROVIDER)
);

const contract = new web3.eth.Contract(USDC_ABI, WEB3_USDC_ADDRESS);

const subscription = contract.events.Transfer();

subscription.on('data', async (event) => {
  try {
    await new TransferEvent(event).save();
    console.log(`+ event stored into mongodb`);
  } catch (e) {
    console.log(`! something wrong when saving event to mongodb: ${e.message}`);
  }
});

module.exports = web3;
