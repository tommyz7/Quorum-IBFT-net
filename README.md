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


Sample (Node.js version)
------------------------

As a sample of working with quorum nodes, here is a small demo.

The sample needs nodejs 8+. Install it by riunning this commands:

    curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt-get -y install nodejs

To run the demo, do the following:

    cd sample-node/
    npm i
    node demo.js

As a result, you should see the following output:

    Deploying contract private for nodes [0, 1, 2]...
    Tx hash 0x931ad063870eee021ad3f4e00f138c76a1f3780afa01a0731ec779fc2d5171b2
    Contract deployed at  0xFe0602D820f42800E3EF3f89e1C39Cd15f78D283

    Initial contract states:
    [ { value: '0' }, { value: '0' }, { value: '0' }, { value: 0 } ]

    Invoking contract.increment()...

    Current contract states:
    [ { value: '1' }, { value: '1' }, { value: '1' }, { value: 0 } ]

The demo deployed the [contract](./sample-node/contract.js) private for nodes [0,
1, 2], but reads its state for nodes [0, 1, 2, 3]. The 3rd node gets zero
result.

You may play with the [code](./sample-node/demo.js), changing `privateFor` value
and looking at the changes in `value` read from different nodes.


Sample (Browser version)
------------------------

The above sample was adopted from the browser. No Node.js needed.

Run:

    cd sample-web/
    python -m SimpleHTTPServer 3000

Then browse your http://localhost:3000. See the same output as in the section
above.


Ethereum wallet
---------------

It is also possible to use https://wallet.ethereum.org/ with your private
network if the following holds:

* You browse [the wallet page] from the same machine that hosts your virtual
  machine.
* Metamask is disabled. Use chrome://extensions/ to disable it in Chrome.

To connect to the node, first start the virtual box, click on the
'quorum-ibft-net' virtual machine > Settings > Network > Advanced > Port
forwarding. Then change the 'Host port' of the node that you want to connect
to to 8545. Then press OK and OK again.

Then browse to [the wallet page] and within several seconds you'll see the
account located on that node.

[the wallet page]: https://wallet.ethereum.org/


Add more accounts
-----------------

To add more accounts to the existing node, you may either generate new one or
add existing one. In this example, I will use the first node (`dd1`). To
generate new one, run:

    cd network
    geth --datadir qdata/dd1 account new

Or copy your existing key to `qdata/dd1/keystore` just as
[istanbul-init.sh](./network/istanbul-init.sh) does.

To look up the existing keys, run:

    geth --datadir qdata/dd1 account list

To be able to send transactions using your new key, you need to unlock it.
To do so, attach to the node and unlock the key manually as following.

    geth attach qdata/dd1/geth.ipc
    > personal.unlockAccount("0x03a9bcc2f6445489d4a08df8f43f73b67d27afd8")

Note also that restarting the network will wipe the `qdata` directory
including all your keys. To save them, back them up like the following.

    cp qdata/dd1/keystore/UTC--2018-06-21T07-54-05.731176371Z--03a9bcc2f6445489d4a08df8f43f73b67d27afd8 keys/my_new_key

And then add restoring your key when the network is re-initialized at
[istanbul-init.sh](./network/istanbul-init.sh) script.

    cp keys/key1 qdata/dd1/keystore        # existing line
    cp keys/my_new_key qdata/dd1/keystore  # add this line

Finally add the number of your key (as `account list` command shows) to the
`--unlock` argument of [istanbul-start.sh](./network/istanbul-start.sh) of the
corresponding node. For example, `--unlock 0,1,2` if you have 3 keys for a
node. Then run `istanbul-start.sh` as usual.

So when you restart the network, you new account persists and gets unlocked
for transacting.
