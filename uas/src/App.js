import React, { useState, useEffect } from "react";
import Web3 from "web3";

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const abi = [
  // Replace with the ABI of your contract
];

const web3 = new Web3(window.ethereum);

function App() {
  const [userIPFSHash, setUserIPFSHash] = useState("");
  const [adminIPFSHash, setAdminIPFSHash] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable();
    }
  }, []);

  const registerUser = async () => {
    const ipfsHash = "YOUR_IPFS_HASH"; // Replace with the actual IPFS hash

    try {
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];

      const contract = new web3.eth.Contract(abi, contractAddress);

      await contract.methods.registerUser(ipfsHash).send({ from: userAddress });

      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const associateUserWithAdmin = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];

      const contract = new web3.eth.Contract(abi, contractAddress);

      await contract.methods
        .associateUserWithAdmin(userAddress)
        .send({ from: userAddress });

      alert("User associated with admin successfully!");
    } catch (error) {
      console.error("Error associating user with admin:", error);
    }
  };

  const getAdminIPFSHash = async () => {
    try {
      const contract = new web3.eth.Contract(abi, contractAddress);

      const adminIPFSHash = await contract.methods.getAdminIPFSHash().call();

      setAdminIPFSHash(adminIPFSHash);
    } catch (error) {
      console.error("Error getting admin IPFS hash:", error);
    }
  };

  const getUserIPFSHash = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];

      const contract = new web3.eth.Contract(abi, contractAddress);

      const userIPFSHash = await contract.methods
        .getUserIPFSHash()
        .call({ from: userAddress });

      setUserIPFSHash(userIPFSHash);
    } catch (error) {
      console.error("Error getting user IPFS hash:", error);
    }
  };

  return (
    <div className="App">
      <h1>Address Registry</h1>
      <button onClick={registerUser}>Register User</button>
      <button onClick={associateUserWithAdmin}>
        Associate User with Admin
      </button>
      <button onClick={getAdminIPFSHash}>Get Admin IPFS Hash</button>
      <button onClick={getUserIPFSHash}>Get User IPFS Hash</button>

      <div>
        <strong>Admin IPFS Hash:</strong> {adminIPFSHash}
      </div>
      <div>
        <strong>User IPFS Hash:</strong> {userIPFSHash}
      </div>
    </div>
  );
}

export default App;
