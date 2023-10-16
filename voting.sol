// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Voting {
    struct Candidate {
        string name;
        string party;
        string imageUri;
    } 

    mapping(uint256 => bool) public device;
    uint256 public deviceCount;

    event deviceToggled(uint256 bb, uint256 id, bool status);

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;

    address public owner;

    mapping(uint256 => uint256) public votes;
    uint256 public totalVotes;

    constructor(){
        owner = msg.sender;
        device[deviceCount++] = false;
        device[deviceCount++] = false;
        device[deviceCount++] = false;
        device[deviceCount++] = false;
    }

    function toggle(uint256 id) public {
        require(id >= 0, "invalid Device Id");
        require(id <= deviceCount, "invalid Device Id");
        device[id] = !device[id];
        emit deviceToggled(1, id, device[id]);
    }

    function addCandidate(string calldata name, string calldata party, string calldata imageUri) public {
        //require(owner == msg.sender, "Not the owner of hte contract");

        candidateCount++;
        Candidate memory person = Candidate({name: name, party: party, imageUri: imageUri});
        candidates[candidateCount] = person;
    }

    function vote(uint256 id) public {
        require(id > 0, "Candidate does not exist");
        require(id <= candidateCount, "Candidate does not exist");

        votes[id]++;
        totalVotes++;
    }
}
