# Load up .env
set -o allexport
if [ -f .env ]; then . ./.env; fi
set +o allexport
export REACT_APP_ACCOUNT_INGRESS_CONTRACT_ADDRESS=$ACCOUNT_INGRESS_CONTRACT_ADDRESS
export REACT_APP_NODE_INGRESS_CONTRACT_ADDRESS=$NODE_INGRESS_CONTRACT_ADDRESS
export REACT_APP_CHAIN_ID=$CHAIN_ID
$@
