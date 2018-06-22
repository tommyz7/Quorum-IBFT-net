const abi = [
  { "constant": true, "inputs": [], "name": "value", "outputs": [{ "name": "", "type": "uint256" }], "payable":false, "stateMutability": "view", "type": "function" },
  { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable":false, "stateMutability": "view", "type": "function" },
  { "constant": false, "inputs": [], "name": "increment", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
];

const bytecode = '0x6060604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600155341561005457600080fd5b61015a806100636000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f2451461005c5780638da5cb5b14610085578063d09de08a146100da575b600080fd5b341561006757600080fd5b61006f6100ef565b6040518082815260200191505060405180910390f35b341561009057600080fd5b6100986100f5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e557600080fd5b6100ed61011a565b005b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001600081548092919060010191905055505600a165627a7a723058205ce92a47fc559b4bb0755893313c865c2940e40612af7b8f306f1ec6f5d90f980029';

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

const from = keys[0];
const gas = 500000;

// Return a web3 object for the specified node.
function getWeb3({ node }) {
  const port = 22000 + node;
  const web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${port}`));
  web3.eth.defaultAccount = keys[node];
  return web3;
};

// Return a web3 contract object with the specified `name`.
function getContract({ web3, address }) {
  return new web3.eth.Contract(abi, address);
};

// Deploy the given `contract` with specified `options`.
async function deploy({ contract, options }) {
  contract.options.data = bytecode;
  const deployed = await contract.deploy()
          .send(options)
          .on('transactionHash', hash => console.log('Tx hash', hash));
  const address =  deployed.options.address;
  contract.options.address = address;
  console.log('Contract deployed at ', address);
  return address;
}

async function show({ address, method, nodes }) {
  console.log(await Promise.all(nodes.map(async node => {
    const web3 = getWeb3({ node });
    const contract = getContract({ web3, address });
    return {
      [method]: (await contract.methods[method]().call({ from }).catch(() => 0)).valueOf(),
    };
  })));
}

async function main() {
  const web3 = getWeb3({ node: 0 });
  const contract = getContract({ web3 });
  const privateFor123 = [ constellationKeys[1], constellationKeys[2] ];

  console.log('Deploying contract private for nodes [0, 1, 2]...');
  const address = await deploy(
    { contract, options: { from, gas, privateFor: privateFor123 } });
  console.log();

  console.log('Initial contract states:');
  await show({ address, method: 'value', nodes: [0, 1, 2, 3] });
  console.log();
  
  console.log('Invoking contract.increment()...');
  await contract.methods.increment().send({ from, gas, privateFor: privateFor123 });
  console.log();

  console.log('Current contract states:');
  await show({ address, method: 'value', nodes: [0, 1, 2, 3] });
  console.log();
}


