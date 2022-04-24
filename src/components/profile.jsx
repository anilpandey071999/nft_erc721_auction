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
    console.log("TIme", 1650786667 <= 1540689264363);
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
          openForAuction: i.openForAuction,
          stratAutionTiming: parseInt(i.stratAutionTiming),
          endAutionTiming: parseInt(i.endAutionTiming),
          autionBasePrice: parseInt(i.autionBasePrice),
        };
        // console.log("Items->>", item,parseInt(i.endAutionTiming) <= parseInt(Date.now().toString().slice(0,10)),parseInt(i.endAutionTiming),Date.now().toString().slice(0,10));
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

  const endAution = async (nftId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const MarketPlaceInstance = new ethers.Contract(
        marketPlaceAddress,
        MarketPlaceABI,
        signer
      );
      let marketContract = await MarketPlaceInstance.endAution(nftId);
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
                  {i.openForAuction ? (
                    <div>
                      <Card.Title>
                        Aution starting Price: {i.autionBasePrice} MDF
                      </Card.Title>
                      {i.endAutionTiming <=
                      parseInt(Date.now().toString().slice(0, 10)) ? (
                        <Button
                          style={{ width: "10rem", verticalAlign: "middle" }}
                          onClick={() => endAution(nft)}
                        >
                          Declared Results
                        </Button>
                      ) : (
                        "Auction is Still going On"
                      )}
                    </div>
                  ) : (
                    <div>
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
                    </div>
                  )}
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
