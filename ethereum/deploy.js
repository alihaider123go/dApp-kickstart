const HDWalletProvider = require('@truffle/hdwallet-provider');
const  {Web3}  = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'organ chase fitness glad runway sell tornado make army badge soup scrub',
    'https://sepolia.infura.io/v3/a3b8e9bb6f05420aa1d677ded39d3631'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();