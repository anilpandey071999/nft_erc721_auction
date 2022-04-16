// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./NFT_ERC721.sol";
import "./Token_ERC20.sol";

contract MinddefContract {
    using Counters for Counters.Counter;

    Counters.Counter private _totalNft;
    address public nftContract;
    address public tokenContract;
    address public owner;
    mapping(uint256 => MarketItem) public idToMarketItem;
    mapping(uint256 => uint256[]) public idTobetingPrtice;
    // mapping(uint256 => mapping(address => uint256)) public idTobetingPrticse;
    mapping(uint256 => address[]) public idTobettingAddress;

    struct MarketItem {
        uint256 nftID;
        uint256 price;
        address seller;
        string uri;
        bool openForSell;
        bool sold;
        bool openForAuction;
        uint256 stratAutionTiming;
        uint256 endAutionTiming;
        uint256 autionBasePrice;
    }

    constructor(address _nftContract, address _mindDefToken, address _owner) {
        nftContract = _nftContract;
        tokenContract = _mindDefToken;
        owner = _owner;
    }

    function addNftCollection(
        uint256 _price,
        uint256 _autionBasePrice,
        bool _openForAuction,
        uint256 _stratAutionTiming,
        uint256 _endAutionTiming,
        string memory _uri
    ) public {
        MindDefnft(nftContract).mint(msg.sender, _uri);
        idToMarketItem[_totalNft.current()] = MarketItem({
            nftID: _totalNft.current(),
            price: _price,
            seller: msg.sender,
            uri: _uri,
            openForSell: true,
            sold: false,
            openForAuction: _openForAuction,
            stratAutionTiming:_stratAutionTiming,
            endAutionTiming:_endAutionTiming,
            autionBasePrice:_autionBasePrice
        });
        _totalNft.increment();
    }

    function openAution(uint256 _marketId,uint256 _bettingPrice) public {
        require(idToMarketItem[_marketId].endAutionTiming > block.timestamp,"Market_Contract: Auction should be open");
        require(idToMarketItem[_marketId].autionBasePrice < _bettingPrice,"Market_Contract: Betting price can not be less then Auction base price");
        require(MindDefToken(tokenContract).allowance(msg.sender,address(this)) > _bettingPrice,"Market_Contract: Need More Allowance");
        MindDefToken(tokenContract).transferFrom(msg.sender,address(this),_bettingPrice);
        idTobetingPrtice[_marketId].push(_bettingPrice);
        idTobettingAddress[_marketId].push(msg.sender);
    }

    function buynft(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        uint256 _totalNfts
    ) public {
        require(idToMarketItem[_totalNfts].price <= amount,"Market_Contract: Please pay listed amount");
        ERC20(tokenContract).transferFrom(to,from,amount);
        ERC721(nftContract).transferFrom(from, to,1);
        idToMarketItem[id-1].seller = to;
        idToMarketItem[id - 1].openForSell = false;
        idToMarketItem[id - 1].sold = true;
    }

    function getListedNft() public view returns(MarketItem[] memory){
        uint itemCount  = 0;
        // uint totalItemCount = totalNft ;
        uint currentIndex = 0;
        for (uint256 index = 0; index < _totalNft.current(); index++) {
            if(idToMarketItem[index].openForSell){
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 index = 0; index < _totalNft.current(); index++) {
            if(idToMarketItem[index].openForSell){
                MarketItem storage currentItem = idToMarketItem[index];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

     function getAllNft() public view returns(MarketItem[] memory){
        uint itemCount  = 0;
        uint currentIndex = 0;
        for (uint256 index = 0; index < _totalNft.current(); index++) {
            if(idToMarketItem[index].seller == msg.sender){
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        if(itemCount > 0){
            for (uint256 index = 0; index < _totalNft.current(); index++) {
                MarketItem storage currentItem = idToMarketItem[index];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function listForSale(uint index,uint256 price) public {
        require(index < _totalNft.current(),"Market_Contract: Invalid Index ");
        idToMarketItem[index].openForSell = !idToMarketItem[index].openForSell;
        idToMarketItem[index].price = price;
    }

    function totalNft() external view returns (uint256 totalNfts) {
        return _totalNft.current();
    }
}
