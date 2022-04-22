import React, { useEffect, useState } from "react";
import {
  ListGroupItem,
  Button,
  Container,
  Alert,
  Row,
  Card,
  ListGroup,
} from "react-bootstrap";
import MarketPlaceABI from "../abis/MarketPlaceAbi";
import { ethers } from "ethers";
import axios from "axios";
import {marketPlaceAddress,tokenAddress} from '../addess'

function Profile() {
  const [account, setAccount] = useState("");
  const [loadingState, setLoadingState] = useState("not-loaded");
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
    let marketContract = await MarketPlaceInstance.getListedNft();
    const items = await Promise.all(
      marketContract.map(async (i) => {
        const meta = await axios.get(i.uri);
        console.log(i[3]);
        console.log("meta", meta.data);
        let item = {
          nftID: parseInt(i.nftID),
          name: meta.data.name,
          description: meta.data.description,
          price: meta.data.price,
          seller: i.seller,
          uri: meta.data.uri,
          openForSell: meta.data.openForSell,
          sold: meta.data.sold,
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

  const buyNFT = async () => {

  }
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
                  <Card.Text>{i.description}</Card.Text>
                  <Card.Title>Price: {i.price} MDF</Card.Title>
                  {parseInt(account) === parseInt(i.seller) ? (
                    <Button
                      style={{ width: "10rem", verticalAlign: "middle" }}
                      onClick={() => "submitData()"}
                    >
                      Owner
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "10rem", verticalAlign: "middle" }}
                      onClick={() => buyNFT()}
                    >
                      BUY
                    </Button>
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
