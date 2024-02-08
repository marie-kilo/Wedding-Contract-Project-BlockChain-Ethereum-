document.addEventListener('DOMContentLoaded', async () => {
    let web3;

    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('User denied account access:', error);
            return;
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return;
    }

    const FactoryABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "certificateNumber",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "contractAddress",
                    "type": "address"
                }
            ],
            "name": "ContractCreated",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_partner1",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_partner2",
                    "type": "string"
                }
            ],
            "name": "createCertificate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "deployedCertificates",
            "outputs": [
                {
                    "internalType": "contract WeddingCertificate",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getDeployedCertificates",
            "outputs": [
                {
                    "internalType": "contract WeddingCertificate[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const FactorytAddress = '0xd89BB9958E49451dAE641e3177500bD5639B7A9D'; // Factoy address

    const contract = new web3.eth.Contract(FactoryABI, FactorytAddress);

    document.getElementById('weddingForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const partner1 = document.getElementById('partner1').value;
        const partner2 = document.getElementById('partner2').value;
        const transactionResultElement = document.getElementById('transactionResult');

        transactionResultElement.innerHTML = 'Status: Please wait... Confirm With MetaMask!!!';

        try {
            const accounts = await web3.eth.getAccounts();

            contract.methods.createCertificate(partner1, partner2).send({ from: accounts[0] })
            .on('transactionHash', (hash) => {
                const txHashLink = `https://goerli.etherscan.io/tx/${hash}`;
                transactionResultElement.innerHTML = `Transaction sent! <a href="${txHashLink}" target="_blank">${hash}</a><br/>Waiting for confirmation...`;
            })
            .on('receipt', (receipt) => {
                const certificateNumber = parseInt(receipt.events.ContractCreated.returnValues.certificateNumber, 10) + 1;
                const newContractAddress = receipt.events.ContractCreated.returnValues.contractAddress;
                const blockNumber = receipt.blockNumber;
                const txHashLink = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;

                transactionResultElement.innerHTML = `
                    Transaction sent! <a href="${txHashLink}" target="_blank">${receipt.transactionHash}</a><br/>Transaction confirmed!
                    <br/>Certificate #: ${certificateNumber}
                    <br/>Block #: ${blockNumber}
                    <br/>New Certificate Address: ${newContractAddress}
                `;
            })
            .on('error', (error) => {
                console.error('Transaction failed:', error);
                transactionResultElement.innerHTML = `Transaction failed: ${error.message}`;
            });
        } catch (error) {
            console.error('Error:', error);
            transactionResultElement.textContent = 'Transaction failed: ' + error.message;
        }
    });

   
    document.getElementById('verify').addEventListener('click', async function() {
        const contractAddress = document.getElementById('contractAddress').value;
    
        // Assuming you have the ABI of WeddingCertificate
        const certificateAbi =  [
            {
                "constant": false,
                "inputs": [],
                "name": "emitPartnerDetails",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_partner1",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_partner2",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "partner1Name",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "partner2Name",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "name": "PartnerDetails",
                "type": "event"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "partner1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "partner2",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const certificateContract = new web3.eth.Contract(certificateAbi, contractAddress);
    
        try {
            const partner1Name = await certificateContract.methods.partner1().call();
            const partner2Name = await certificateContract.methods.partner2().call();
    
            const currentBlockNumber = await web3.eth.getBlockNumber();
                
            document.getElementById('verificationResult').innerText = `Partner 1: ${partner1Name}, Partner 2: ${partner2Name}, Block#: ${currentBlockNumber}`;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('verificationResult').innerText = 'Error: ' + error.message;
        }
    });
});
