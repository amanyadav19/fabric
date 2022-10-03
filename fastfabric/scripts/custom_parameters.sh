#!/usr/bin/env bash


export PEER_DOMAIN=""           # can be anything if running on localhost
export ORDERER_DOMAIN=""        # can be anything if running on localhost

# fill in the addresses without domain suffix and without ports
export FAST_PEER_ADDRESS="fallback-fab-ii"
export ORDERER_ADDRESS="fallback-fab"

# leave endorser address and storage address blank if you want to run on a single server
export ENDORSER_ADDRESS=("fallback-fab-iii")      # can define multiple addresses in the form ( "addr1" "addr2" ... )
export STORAGE_ADDRESS="fallback-fab-i"

export CHANNEL="ch"               # the name of the created channel of the network
export CHAINCODE="cc"             # the name of the chaincode used on the channel
