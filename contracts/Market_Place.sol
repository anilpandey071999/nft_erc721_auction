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

    constructor(
        address _nftContract,
        address _mindDefToken,
        address _owner
    ) {
        nftContract = _nftContract;
        tokenContract = _mindDefToken;
        owner = _owner;
    }

    function reverse(string memory _str) internal pure returns (string memory) {
        bytes memory str = bytes(_str);
        string memory tmp = new string(str.length);
        bytes memory _reverse = bytes(tmp);

        for (uint256 i = 0; i < str.length; i++) {
            _reverse[str.length - i - 1] = str[i];
        }

        return string(_reverse);
    }

    function compare(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function Palindrome(string memory _str) public pure returns (bool) {
        string memory rev = reverse(_str);
        return compare(rev, _str);
    }

    function addNftCollection(
        uint256 _price,
        uint256 _autionBasePrice,
        bool _openForAuction,
        uint256 _stratAutionTiming,
        uint256 _endAutionTiming,
        string memory _uri,
        string memory _palindromeString
    ) public {
        require(Palindrome(_palindromeString),"String is not palindrome");
        MindDefnft(nftContract).mint(msg.sender, _uri);
        idToMarketItem[_totalNft.current()] = MarketItem({
            nftID: _totalNft.current(),
            price: _price,
            seller: msg.sender,
            uri: _uri,
            openForSell: true,
            sold: false,
            openForAuction: _openForAuction,
            stratAutionTiming: _stratAutionTiming,
            endAutionTiming: _endAutionTiming,
            autionBasePrice: _autionBasePrice
        });
        _totalNft.increment();
    }

    function openAution(uint256 _marketId, uint256 _bettingPrice) public {
        require(
            idToMarketItem[_marketId].endAutionTiming > block.timestamp,
            "Market_Contract: Auction should be open"
        );
        require(
            idToMarketItem[_marketId].autionBasePrice < _bettingPrice,
            "Market_Contract: Betting price can not be less then Auction base price"
        );
        require(
            MindDefToken(tokenContract).allowance(msg.sender, address(this)) >
                _bettingPrice,
            "Market_Contract: Need More Allowance"
        );
        MindDefToken(tokenContract).transferFrom(
            msg.sender,
            address(this),
            _bettingPrice
        );
        idTobetingPrtice[_marketId].push(_bettingPrice);
        idTobettingAddress[_marketId].push(msg.sender);
    }

    function endAution(uint256 _marketId) public {
        require(
            idToMarketItem[_marketId].endAutionTiming < block.timestamp,
            "Market_Contract: Auction should be open"
        );
        if (idTobetingPrtice[_marketId].length != 0) {
            uint256 highestBider = 0;
            for (
                uint256 index = idTobetingPrtice[_marketId].length - 1;
                index > 0;
                index--
            ) {
                if (
                    idTobetingPrtice[_marketId][index] >
                    idTobetingPrtice[_marketId][index - 1]
                ) {
                    highestBider = index;
                }
            }

            ERC20(tokenContract).transfer(
                idToMarketItem[_marketId].seller,
                idTobetingPrtice[_marketId][highestBider]
            );
            ERC721(nftContract).transferFrom(
                idToMarketItem[_marketId].seller,
                idTobettingAddress[_marketId][highestBider],
                _marketId
            );
            idToMarketItem[_marketId].seller = idTobettingAddress[_marketId][
                highestBider
            ];
            idToMarketItem[_marketId].openForSell = false;
            idToMarketItem[_marketId].openForAuction = false;
            idToMarketItem[_marketId].sold = true;
        } else {
            idToMarketItem[_marketId].openForAuction = false;
        }
    }

    function buynft(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) public {
        require(
            idToMarketItem[id].price <= amount,
            "Market_Contract: Please pay listed amount"
        );
        ERC20(tokenContract).transferFrom(to, from, amount);
        ERC721(nftContract).transferFrom(from, to, id);
        idToMarketItem[id].seller = to;
        idToMarketItem[id].openForSell = false;
        idToMarketItem[id].sold = true;
    }

    function getListedNft() public view returns (MarketItem[] memory) {
        uint256 itemCount = 0;
        // uint totalItemCount = totalNft ;
        uint256 currentIndex = 0;
        for (uint256 index = 0; index < _totalNft.current(); index++) {
            if (idToMarketItem[index].openForSell) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 index = 0; index < _totalNft.current(); index++) {
            if (idToMarketItem[index].openForSell) {
                MarketItem storage currentItem = idToMarketItem[index];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getAllNft() public view returns (MarketItem[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 index = 0; index < _totalNft.current(); index++) {
            if (idToMarketItem[index].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        if (itemCount > 0) {
            for (uint256 index = 0; index < _totalNft.current(); index++) {
                if (idToMarketItem[index].seller == msg.sender) {
                    MarketItem storage currentItem = idToMarketItem[index];
                    items[currentIndex] = currentItem;
                    currentIndex += 1;
                }
            }
        }
        return items;
    }

    function listForSale(uint256 index, uint256 price) public {
        require(index < _totalNft.current(), "Market_Contract: Invalid Index ");
        idToMarketItem[index].openForSell = !idToMarketItem[index].openForSell;
        idToMarketItem[index].price = price;
    }

    function totalNft() external view returns (uint256 totalNfts) {
        return _totalNft.current();
    }
}
