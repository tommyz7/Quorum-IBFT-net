Quorum network
==============

This is a setup for quorum network using IBFT consensus. It is based on the
[7nodes] example.

[7nodes]: https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes


How to start
------------

    vagrant up
    vagrant ssh
    cd network
    ./istanbul-init.sh
    ./istanbul-start.sh

To stop the network, run `./stop.sh`.

To restart the network, run `./istanbul-init.sh && ./istanbul-start.sh`.

To connect to a node's console, run `geth attach qdata/dd1/geth.ipc` (or `dd2`
for the 2nd node, etc).


Metamask
--------

Connect metamask to the 'Custom RPC' and specify http://localhost:22000 for
the 1st node, http://localhost:22001 for the second, ...,
http://localhost:22006 for the 7th.

Import the keys by clicking on 'Import Account', then 'Select type' to 'JSON
file', pick one of the keys from [metamask-keys](./metamask-keys/) directory
and specify password '123'.

*Note*, that current metamask does not send transactions correctly to the
`geth` nodes of the current quorum. The problem is described in metamask
[issue-1444](https://github.com/MetaMask/metamask-extension/issues/1444) and
unfortunately proposed fix only works with the latest `geth` 1.8.11, but the
quorum provides 1.7.2.

So, metamask currently can query the blockchain, but not send any transaction.
