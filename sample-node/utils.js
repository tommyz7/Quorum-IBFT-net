const Web3 = require('web3');
const Contract = require('./contract');

// Actor keys taken from network/keys/key?
const keys = [
  '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
  '0xca843569e3427144cead5e4d5999a3d0ccf92b8e',
  '0x0fbdc686b912d7722dc86510934589e0aaf3b55a',
];

// Constellation public keys are taken from network/keys/tm?.pub
const constellationKeys = [
  "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
  "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
  "1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=",
];


// Return a web3 object for the specified node.
function web3({ node }) {
  const port = 22000 + node;
  const web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${port}`));
  web3.eth.defaultAccount = keys[node];
  return web3;
};

// Return a web3 contract object with the specified `name`.
function contract({ web3, address }) {
  return new web3.eth.Contract(Contract.abi, address);
};

// Deploy the given `contract` with specified `options`.
async function deploy({ contract, options }) {
  contract.options.data = Contract.bytecode;
  const deployed = await contract.deploy()
          .send(options)
          .on('transactionHash', hash => console.log('Tx hash', hash));
  const address =  deployed.options.address;
  contract.options.address = address;
  console.log('Contract deployed at ', address);
  return address;
}

module.exports = { keys, constellationKeys, web3, contract, deploy };
