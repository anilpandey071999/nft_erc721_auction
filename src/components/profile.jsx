import React, { useEffect, useState } from "react";
import {
  ListGroupItem,
  Button,
  Container,
  Alert,
  Form,
  Row,
  Card,
  Spinner,
} from "react-bootstrap";
import MarketPlaceABI from "../abis/MarketPlaceAbi";
import { ethers } from "ethers";
import axios from "axios";
import { marketPlaceAddress, tokenAddress } from "../addess";

function Profile() {
  const [account, setAccount] = useState("");
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [newPrice, setNewPrice] = useState(0);
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    if (nfts <= 0) {
      getAll();
    }
  });
  const getAll = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [acc] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(acc);
    const MarketPlaceInstance = new ethers.Contract(
      marketPlaceAddress,
      MarketPlaceABI,
      signer
    );
    let marketContract = await MarketPlaceInstance.getAllNft();
    const items = await Promise.all(
      marketContract.map(async (i) => {
        const meta = await axios.get(i.uri);
        console.log(i);
        console.log("meta", meta.data);
        let item = {
          nftID: parseInt(i.nftID),
          name: meta.data.name,
          description: meta.data.description,
          price: i.price.toString(),
          seller: i.seller,
          uri: meta.data.uri,
          openForSell: i.openForSell,
          sold: i.sold,
          openForAuction: meta.data.openForAuction,
          stratAutionTiming: meta.data.stratAutionTiming,
          endAutionTiming: meta.data.endAutionTiming,
          autionBasePrice: meta.data.autionBasePrice,
        };
        console.log("Items->>", item);
        return item;
      })
    );
    console.log("Items", items);
    setNfts(items);
  };

  const listingAndDeListing = async (nftId, price) => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const MarketPlaceInstance = new ethers.Contract(
      marketPlaceAddress,
      MarketPlaceABI,
      signer
    );
    let marketContract = await MarketPlaceInstance.listForSale(
      nftId,
      newPrice === 0 ? price : newPrice
    );
    setLoadingState("Loading");
    await marketContract.wait();
    setLoadingState("not-loaded");
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingState === "Loading") return <Spinner animation="border" />;
  if (nfts.length <= 0)
    return (
      <Container class="fs-1 text-center" style={{ width: "64rem" }}>
        Market Place is Empty
      </Container>
    );
  return (
    <div>
      <Container>
        <Row md={4}>
          {nfts.map((i, nft) => (
            <Container>
              <Card style={{ width: "18rem", padding: "0rem" }}>
                <Card.Img
                  variant="top"
                  style={{ width: "18rem", height: "18rem" }}
                  src={`${i.uri}`}
                />
                <Card.Body>
                  <Card.Title>{i.name}</Card.Title>
                  <Card.Text>{i.openForSell.toString()}</Card.Text>
                  <Card.Title>Price: {i.price} MDF</Card.Title>
                  <Form.Control
                    type="text"
                    placeholder="New lIsting Price"
                    onChange={(e) => {
                      setNewPrice(e.target.value);
                    }}
                  />
                  <Button
                    style={{ width: "10rem", verticalAlign: "middle" }}
                    onClick={() => listingAndDeListing(nft, i.price)}
                  >
                    {i.openForSell ? "DeList From Sell" : "List For Sell"}
                  </Button>
                </Card.Body>
              </Card>
            </Container>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
