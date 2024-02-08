// pragma solidity ^0.5.7;

// contract WeddingCertificate {
//     string public partner1;
//     string public partner2;

//     constructor(string memory _partner1, string memory _partner2) public {
//         partner1 = _partner1;
//         partner2 = _partner2;
//     }

//     //  Optional: Functions to get partner names (if not using public variables)
//      function getPartner1() public view returns (string memory) {
//         return partner1;
//      }
    
//      function getPartner2() public view returns (string memory) {
//         return partner2;
//      }
// }


pragma solidity ^0.5.7;

contract WeddingCertificate {
    string public partner1;
    string public partner2;

    // Event declaration
    event PartnerDetails(string partner1Name, string partner2Name, uint256 blockNumber);

    constructor(string memory _partner1, string memory _partner2) public {
        partner1 = _partner1;
        partner2 = _partner2;
    }

    // Function to emit the details of partners and the current block number
    function emitPartnerDetails() public {
        emit PartnerDetails(partner1, partner2, block.number);
    }
}
