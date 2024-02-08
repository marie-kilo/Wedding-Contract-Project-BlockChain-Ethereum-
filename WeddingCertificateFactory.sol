pragma solidity ^0.5.7;

// Ensure the path to WeddingCertificate.sol is correct
import "./WeddingCertificate.sol";

contract WeddingCertificateFactory {
    // Array to store deployed WeddingCertificates
    WeddingCertificate[] public deployedCertificates;

    // Event to emit when a new WeddingCertificate is created
    event ContractCreated(uint256 certificateNumber, address contractAddress);


    // Function to create a new WeddingCertificate
    function createCertificate(string memory _partner1, string memory _partner2) public {
    WeddingCertificate newCertificate = new WeddingCertificate(_partner1, _partner2);
    deployedCertificates.push(newCertificate);
    uint256 certificateNumber = deployedCertificates.length - 1; // Index of the new certificate

    emit ContractCreated(certificateNumber, address(newCertificate));
}


    // Function to get all deployed WeddingCertificates
    function getDeployedCertificates() public view returns (WeddingCertificate[] memory) {
        return deployedCertificates;
    }
}


// pragma solidity ^0.5.7;

// import "./WeddingCertificate.sol";

// contract WeddingCertificateFactory {
//     WeddingCertificate[] public deployedCertificates;

//     event ContractCreated(uint256 certificateNumber, address contractAddress);

//     function createCertificate(string memory _partner1, string memory _partner2) public {
//         WeddingCertificate newCertificate = new WeddingCertificate(_partner1, _partner2);
//         deployedCertificates.push(newCertificate);

//         // Index of the new certificate
//         uint256 certificateNumber = deployedCertificates.length - 1;

//         // Emit an event with the certificate number and the new contract's address
//         emit ContractCreated(certificateNumber, address(newCertificate));
//         emit ContractCreated(certificateNumber, address(newCertificate));
//     }

//     function getDeployedCertificates() public view returns (WeddingCertificate[] memory) {
//         return deployedCertificates;
//     }
// }
