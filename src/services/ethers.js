const { ethers } = require('ethers');
const dotenv = require('dotenv');
require('../utils/bigint');

dotenv.config();

const WEB3_PROVIDER = process.env.WEB3_PROVIDER || 'wss://ethereum-rpc.publicnode.com';

const provider = new ethers.WebSocketProvider(WEB3_PROVIDER);

module.exports = {
  ethers,
  provider,
};
