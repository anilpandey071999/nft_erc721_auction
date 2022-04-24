const marketPlace = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mindDefToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_autionBasePrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_openForAuction",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_stratAutionTiming",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endAutionTiming",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "addNftCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "buynft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_marketId",
        type: "uint256",
      },
    ],
    name: "endAution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllNft",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nftID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bool",
            name: "openForSell",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "openForAuction",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "stratAutionTiming",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAutionTiming",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "autionBasePrice",
            type: "uint256",
          },
        ],
        internalType: "struct MinddefContract.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListedNft",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nftID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bool",
            name: "openForSell",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "openForAuction",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "stratAutionTiming",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAutionTiming",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "autionBasePrice",
            type: "uint256",
          },
        ],
        internalType: "struct MinddefContract.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToMarketItem",
    outputs: [
      {
        internalType: "uint256",
        name: "nftID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "bool",
        name: "openForSell",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "openForAuction",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "stratAutionTiming",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endAutionTiming",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "autionBasePrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idTobetingPrtice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idTobettingAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nftContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_marketId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bettingPrice",
        type: "uint256",
      },
    ],
    name: "openAution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalNft",
    outputs: [
      {
        internalType: "uint256",
        name: "totalNfts",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default marketPlace;
