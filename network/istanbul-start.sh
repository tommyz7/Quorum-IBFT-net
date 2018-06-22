#!/bin/bash
set -u
set -e

mkdir -p qdata/logs
echo "[*] Starting Constellation nodes"
./constellation-start.sh

echo "[*] Starting Ethereum nodes"
set -v
ARGS="--nodiscover --syncmode full --mine --rpc --rpcaddr 0.0.0.0 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul"
PRIVATE_CONFIG=qdata/c1/tm.ipc nohup geth --datadir qdata/dd1 $ARGS --rpcport 22000 --port 21000 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/1.log &
PRIVATE_CONFIG=qdata/c2/tm.ipc nohup geth --datadir qdata/dd2 $ARGS --rpcport 22001 --port 21001 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/2.log &
PRIVATE_CONFIG=qdata/c3/tm.ipc nohup geth --datadir qdata/dd3 $ARGS --rpcport 22002 --port 21002 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/3.log &
PRIVATE_CONFIG=qdata/c4/tm.ipc nohup geth --datadir qdata/dd4 $ARGS --rpcport 22003 --port 21003 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/4.log &
PRIVATE_CONFIG=qdata/c5/tm.ipc nohup geth --datadir qdata/dd5 $ARGS --rpcport 22004 --port 21004 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/5.log &
PRIVATE_CONFIG=qdata/c6/tm.ipc nohup geth --datadir qdata/dd6 $ARGS --rpcport 22005 --port 21005 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/6.log &
PRIVATE_CONFIG=qdata/c7/tm.ipc nohup geth --datadir qdata/dd7 $ARGS --rpcport 22006 --port 21006 --rpccorsdomain "*" --unlock 0 --password passwords.txt 2>>qdata/logs/7.log &
set +v

echo
echo "All nodes configured. See 'qdata/logs' for logs, and run e.g. 'geth attach qdata/dd1/geth.ipc' to attach to the first Geth node."
