import web3 from './web3.js';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),'0xD2406f19149A92E25648AB1a46BbcBDCb90Ee59F');

export default instance;