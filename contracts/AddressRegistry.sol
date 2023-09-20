// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract AddressRegistry {
    mapping(address => string) private userToIPFSHash;

    address public admin;

    constructor() public {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function registerUser(string memory ipfsHash) public {
        require(
            bytes(userToIPFSHash[msg.sender]).length == 0,
            "User is already registered"
        );
        userToIPFSHash[msg.sender] = ipfsHash;
    }

    function associateUserWithAdmin(address user) public onlyAdmin {
        require(
            bytes(userToIPFSHash[user]).length != 0,
            "User is not registered"
        );
        userToIPFSHash[admin] = userToIPFSHash[user];
    }

    function getAdminIPFSHash() public view onlyAdmin returns (string memory) {
        return userToIPFSHash[admin];
    }

    function getUserIPFSHash() public view returns (string memory) {
        return userToIPFSHash[msg.sender];
    }
}
