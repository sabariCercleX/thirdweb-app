// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BloodDonation is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _requestIds;
    struct Donor {
        uint256 donorId;
        string name;
        string bloodType;
        string address;
        string mobile;
        int256 latitude;
        int256 longitude;
        address address;
    }
    struct BloodBank {
        uint256 bloodBankId;
        string name;
        string address;
        string mobile;
        int256 latitude;
        int256 longitude;
        address address;
    }
    struct BloodRequestDetails{
        uint id;
        string bloodType;
        uint createdDate;
        uint dueDate;
        uint256 bloodBankId;
    }
    mapping(uint256 => Donor) public donors;
    mapping(uint256 => BloodBank) public bloodBanks;
    mapping(uint256 => BloodRequestDetails) public bloodrequests;
    mapping(uint256 => uint256) public tokenIdToRequestId;
    event DonorRegistered(uint256 indexed donorId, string name, string bloodType, string address,string mobile, int256 latitude,int256 longitude,address address);
    event BloodBankRegistered(uint256 indexed bloodBankId, string name, string address, string mobile, int256 latitude, int256 longitude, address address);
    event BloodRequest(uint256 indexed requestId, uint256 indexed bloodBankId, string bloodType, uint createdDate, uint dueDate, uint256 bloodBankId);
    event BloodRequestAccepted(uint256 indexed requestId, uint256 indexed donorId);
    event BloodRequestRejected(uint256 indexed requestId, uint256 indexed donorId);
    event DonationNFTGenerated(uint256 indexed tokenId, uint256 indexed donorId, uint256 indexed requestId);

    constructor() ERC721("BloodDonation", "BDN") {}

    function registerDonor(string memory name, string memory bloodType, string memory address,string memory mobile, int256 latitude,int256 longitude,address memory address) public {
        _tokenIds.increment();
        uint256 donorId = _tokenIds.current();
        donors[donorId] = Donor(donorId, name, bloodType, latitude, longitude);
        emit DonorRegistered(donorId, name, bloodType, latitude, longitude);
    }
    function registerBloodBank(string memory name, string memory address,string memory mobile, int256 latitude,int256 longitude,address memory address) public onlyOwner {
        _tokenIds.increment();
        uint256 bloodBankId = _tokenIds.current();
        bloodBanks[bloodBankId] = BloodBank(bloodBankId, name, latitude, longitude);
        emit BloodBankRegistered(bloodBankId, name, latitude, longitude);
    }
    function requestBlood(uint256 bloodBankId, string memory bloodType) public onlyOwner {
        require(bloodBanks[bloodBankId].id != 0, "Blood bank not registered.");
        uint256 requestId = bloodBankId * 1000000 + uint256(keccak256(abi.encodePacked(block.timestamp, bloodType)));
        emit BloodRequest(requestId, bloodBankId, bloodType);
    }
    function createBloodRequest(string memory bloodType, uint dueDate, uint256 bloodBankId) public {
        _requestIds.increment();
        uint256 requestId = _requestIds.current();
        require(bloodBanks[bloodBankId].id != 0, "Blood bank not registered.");
        bloodrequests[requestId] = BloodRequestDetails(requestId,bloodType,block.timestamp,dueDate,bloodBankId);
    }
    function acceptBloodRequest(uint256 requestId, uint256 donorId) public {
        require(donors[donorId].id != 0, "Donor not registered.");
        uint256 tokenId = donorId * 1000000 + requestId;
        tokenIdToRequestId[tokenId] = requestId;
        _safeMint(msg.sender, tokenId);
        emit BloodRequestAccepted(requestId, donorId);
        emit DonationNFTGenerated(tokenId, donorId, requestId);
    }
    function rejectBloodRequest(uint256 requestId, uint256 donorId) public {
        require(donors[donorId].id != 0, "Donor not registered.");
        emit BloodRequestRejected(requestId, donorId);
    }
    function getRequestDetails(uint256 tokenId) public view returns (uint256 requestId, uint256 bloodBankId, string memory bloodType) {
        requestId = tokenIdToRequestId[tokenId];
        require(requestId != 0, "Request not found.");
        bloodBankId = requestId / 1000000;
        BloodBank memory bloodBank = bloodBanks[bloodBankId];
        require(bloodBank.id != 0, "Blood bank not registered.");
        bytes32 bloodTypeHash = bytes32(requestId % 1000000);
        bloodType = _hashToBloodType(bloodTypeHash);
    }
    function getDonor(uint256 offset, uint256 limit) public view returns (Donor[] memory){
        Donor[] memory donorlist = new Donor[](limit);
        uint256 j = 0;
        for (uint256 i = offset; i < offset + limit; i++) {
            donorlist[j] = donors[i];
            j++;
        }
    return donorlist;
    }
    function getBloodBank(uint256 offset, uint256 limit) public view returns (BloodBank[] memory){
        BloodBank[] memory banklist = new BloodBank[](limit);
        uint256 j = 0;
        for (uint256 i = offset; i < offset + limit; i++) {
            banklist[j] = bloodBanks[i];
            j++;
        }
    return banklist;
    }
    function getRequestList(uint256 offset, uint256 limit) public view returns (BloodRequestDetails[] memory){
        BloodRequestDetails[] memory requestlist = new BloodRequestDetails[](limit);
        uint256 j = 0;
        for (uint256 i = offset; i < offset + limit; i++) {
            requestlist[j] = bloodrequests[i];
            j++;
        }
    return requestlist;
    }
function _hashToBloodType(bytes32 bloodTypeHash) private pure returns (string memory) {
    uint8 bloodType = uint8(bloodTypeHash[31]) % 8;
    if (bloodType == 0) return "A+";
    if (bloodType == 1) return "A-";
    if (bloodType == 2) return "B+";
    if (bloodType == 3) return "B-";
    if (bloodType == 4) return "AB+";
    if (bloodType == 5) return "AB-";
    if (bloodType == 6) return "O+";
    if (bloodType == 7) return "O-";
    return "";
}
}