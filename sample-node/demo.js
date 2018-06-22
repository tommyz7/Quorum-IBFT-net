const utils = require('./utils');

const from = utils.keys[0];
const gas = 500000;

async function show({ address, method, nodes }) {
  console.log(await Promise.all(nodes.map(async node => {
    const web3 = utils.web3({ node });
    const contract = utils.contract({ web3, address });
    return {
      [method]: (await contract.methods[method]().call({ from }).catch(() => 0)).valueOf(),
    };
  })));
}

async function main() { 
  const web3 = utils.web3({ node: 0 });
  const contract = utils.contract({ web3 });
  const privateFor123 = [ utils.constellationKeys[1], utils.constellationKeys[2] ];

  console.log('Deploying outer contract private for nodes [0, 1, 2]...');
  const address = await utils.deploy(
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

main().catch(console.log);

