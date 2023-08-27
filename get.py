# Setup
import time
from web3 import Web3
from web3.middleware import geth_poa_middleware
import json

# alchemy_url = "https://sepolia.infura.io/v3/6f2f95ec16214f24af35c3bf3f070967"
alchemy_url = "https://evm.ngd.network:32332/"
w3 = Web3(Web3.HTTPProvider(alchemy_url))

private_key = ''
w3.eth.account.from_key(private_key)
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# w3.eth.default_account = acct.address

contract_address = '0xE84c56f262A76fa379809FC1EeD0FDca531E51d2'
# me = w3.eth.default_account
# print(me)

# Print if web3 is successfully connected
# print(w3.is_connected())

# Get the latest block number
# latest_block = w3.eth.block_number
# print(latest_block)

# # Get the balance of an account
# balance = w3.eth.get_balance('0xfB12Ad056716430BE0477802faD0933040fbA76C')
# print(balance)

# # Get the information of a transaction
# tx = w3.eth.get_transaction('0x5e63a9cbe2fa56ebdc2f756e3fd6e15086e10bcf352908a12b6a3861d65c0e3e')
# # print(tx)

with open('./abi.json') as f:
    abi = json.load(f)
# print(abi)

wallet_address = '0xfB12Ad056716430BE0477802faD0933040fbA76C'

print(f'Making a call to contract at address: { contract_address }')
Incrementer = w3.eth.contract(address=contract_address, abi=abi)
deviceToggled = Incrementer.events.deviceToggled()

# device = [False]*4

# def printDevice():
#     print(device)

# printDevice()

# for i in range(4):
#     device[i] = Incrementer.functions.device(i).call()

# printDevice()

# def handle_event(event):
#     receipt = w3.eth.wait_for_transaction_receipt(event['transactionHash'])
#     result = deviceToggled.process_receipt(receipt)[0]['args']
#     # print(status['id'], status['status'])
#     device[result['id']] = result['status']
#     printDevice()

# def log_loop(event_filter, poll_interval):
#     while True:
#         for event in event_filter.get_new_entries():
#             handle_event(event)
#             time.sleep(poll_interval)

# block_filter = w3.eth.filter({'fromBlock':'latest', 'address':contract_address})
# log_loop(block_filter, 2)

nonce = w3.eth.get_transaction_count(wallet_address)
increment_tx = Incrementer.functions.vote(1).build_transaction({
    "from": wallet_address,
    "gas": 1000000,
    "gasPrice": w3.to_wei("100", "gwei"),
    "nonce": nonce
})
signed = w3.eth.account.sign_transaction(increment_tx, private_key=private_key)
tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_hash, receipt)