// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MindDefnft is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256=>string) public nft_uri;

    constructor() ERC721("Mindef721", "MD721") {}

    function mint(address to,string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        nft_uri[_tokenIdCounter.current()] = uri;
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}