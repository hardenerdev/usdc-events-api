const { Web3, WebSocketProvider } = require('web3');
const dotenv = require('dotenv');
require('../utils/bigint');

dotenv.config();

const WEB3_PROVIDER = process.env.WEB3_PROVIDER || 'wss://ethereum-rpc.publicnode.com';

const web3 = new Web3(
  new WebSocketProvider(WEB3_PROVIDER)
);

module.exports = web3;
