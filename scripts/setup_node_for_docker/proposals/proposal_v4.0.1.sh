#!/bin/bash

# echo binary build
# mkdir -p ~/.ununifi/cosmovisor/upgrades/v2_1/bin
# cd ~
# git clone https://github.com/UnUniFi/chain.git
# cd chain
# git checkout newDevelop
# make build -B
# cp ./build/ununifid ~/.ununifi/cosmovisor/upgrades/v2_1/bin

# echo copy from local
# mkdir -p ~/.ununifi/cosmovisor/upgrades/v3/bin
# cp ./ununifid ~/.ununifi/cosmovisor/upgrades/v3/bin
# chmod 755 ~/.ununifi/cosmovisor/upgrades/v3/bin/ununifid

VAL_MNEMONIC_1="figure web rescue rice quantum sustain alert citizen woman cable wasp eyebrow monster teach hockey giant monitor hero oblige picnic ball never lamp distance"
FAUCET_MNEMONIC_1="chimney diesel tone pipe mouse detect vibrant video first jewel vacuum winter grant almost trim crystal similar giraffe dizzy hybrid trigger muffin awake leader"
USER_MNEMONIC_1="supply release type ostrich rib inflict increase bench wealth course enter pond spare neutral exact retire thing update inquiry atom health number lava taste"
VAL1=val
FAUCET=faucet
USER1=user1

until  ununifid q block 2>&1 |grep "last_block_id" >/dev/null 2>&1 ; do
    printf 'waitting...'
    sleep 1
done


current_height=$(ununifid q block 2>&1 | jq . | grep height|head -n 1 | grep -o -E '[0-9]+')

BIN_UNI=~/.ununifi/cosmovisor/current/bin/ununifid

echo "current_height: $current_height"
echo "current_height: $current_height"
echo "current_height: $current_height"
echo "current_height: $current_height"
echo "current_height: $current_height"
echo "current_height: $current_height"
UP_HEIGHT=$((current_height+12))
echo "up_height: $UP_HEIGHT"
echo "up_height: $UP_HEIGHT"
echo "up_height: $UP_HEIGHT"
echo "up_height: $UP_HEIGHT"

MD5=71334923dcd583ea70ce013b30cd154f
BIN_URL=https://github.com/UnUniFi/chain/releases/download/v4.0.1/ununifid

$BIN_UNI tx bank send \
faucet ununifi15hggf3c67juhfytwcs55pawatl7t3mgmumr2pl 3000000000000uguu \
--from faucet  \
--keyring-backend test \
--yes \
--chain-id $CHAIN_ID

sleep 6

$BIN_UNI tx bank send \
faucet ununifi10jath6g7kn8ly6jkthdrpu37dd72s565wvmrvx 100uguu \
--from faucet  \
--keyring-backend test \
--yes \
--chain-id $CHAIN_ID

$BIN_UNI tx gov submit-legacy-proposal software-upgrade v4_0_1 \
--title "upgrade v4.0.1" \
--description "Upgrade UnUniFi v4.0.1 at height xx. More info for v4.0.1, visit GiyHub https://github.com/UnUniFi/chain/releases/tag/v4.0.1" \
--upgrade-info "{\"binaries\":{\"linux/amd64\":\"$BIN_URL?checksum=md5:$MD5\"}}" \
--upgrade-height $UP_HEIGHT \
--from val  \
--keyring-backend test \
--yes \
--chain-id $CHAIN_ID

sleep 5

$BIN_UNI tx gov deposit 1 \
10000000000uguu --from val --yes \
--keyring-backend test \
--chain-id $CHAIN_ID

$BIN_UNI tx gov deposit 1 \
500000000000uguu --from faucet --yes \
--keyring-backend test \
--chain-id $CHAIN_ID

sleep 5

$BIN_UNI tx gov vote 1 \
yes --from val \
--keyring-backend test \
--yes --chain-id $CHAIN_ID

$BIN_UNI tx gov vote 1 \
yes --from faucet \
--keyring-backend test \
--yes --chain-id $CHAIN_ID

$BIN_UNI query gov proposals;
