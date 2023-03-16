#!/bin/bash
set -xe

sudo systemctl stop cosmovisor
cd ~/chain_repo
make install
# check file is exist rm file
if [ -f ~/.ununifi/cosmovisor/genesis/bin/ununifi ]; then
  rm ~/.ununifi/cosmovisor/genesis/bin/ununifi
fi
cp ~/go/bin/ununifi $DAEMON_HOME/cosmovisor/genesis/bin
SCRIPT_DIR=$(cd $(dirname $0); pwd)
$SCRIPT_DIR/../reset_debug_node/run.sh
