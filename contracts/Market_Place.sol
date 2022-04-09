// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./NFT_ERC721.sol";


contract MinddefContract{
    using Counters for Counters.Counter;

    Counters.Counter private _totalNft;
    address public nftContract;
    address public owner;
    mapping(uint256 => MarketItem) public idToMarketItem;


    struct MarketItem{
        uint256 nftID;
        uint256 price;
        address seller;
        string uri;
        bool openForSell;
        bool sold;
    }

    constructor(address _nftContract,address _owner){
        nftContract = _nftContract;
        owner = _owner;
    }

    function addNftCollection(uint256 _nftID,uint256 _price,string memory _uri) public {
        MindDefnft(nftContract).mint(msg.sender,_uri);
        idToMarketItem[_totalNft.current()] = MarketItem({
            nftID:_nftID,
            price: _price,
            seller:msg.sender,
            uri: _uri,
            openForSell: false,
            sold:false
        });
        _totalNft.increment();
    }

    function totalNft() external view returns(uint256 totalNfts){
        return _totalNft.current();
    }
}
