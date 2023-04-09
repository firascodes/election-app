// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Voting {
    struct Candidate{
        string name;
        string party;
        string imageUri;
    }

    address public owner;
    constructor(){
        owner=msg.sender;
    }

    uint256 public candidateCount;
    mapping(uint256 => Candidate) public candidates;

    mapping(uint256 => uint256) public votes;
    uint256 public totalVotes;

    mapping(address => uint256) public votesByAddress; // new mapping to keep track of votes by each address

    function addCandidate(string calldata name, string calldata party, string calldata imageUri) public {
        
        require(owner == msg.sender, "Not the owner of the contract");

        candidateCount++;
        Candidate memory person = Candidate({ name: name, party: party, imageUri: imageUri });
        candidates[candidateCount] = person;
    }

    function vote(uint256 id) public {
        require(id > 0, "Candidate doesn't exist");
        require(id <= candidateCount, "Candidate doesn't exist");
        // check if the caller has already cast 1 votes
        require(votesByAddress[msg.sender] < 1, "Already casted one vote");
        votes[id]++;
        votesByAddress[msg.sender]++; // increment the vote count for the caller
        totalVotes++;
    }
    

}
