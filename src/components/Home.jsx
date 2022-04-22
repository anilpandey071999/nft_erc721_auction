import React, { useEffect, useState } from "react";
import {
  ListGroupItem,
  Button,
  Container,
  Alert,
  Row,
  Card,
  ListGroup,
  Spinner
} from "react-bootstrap";
import MarketPlaceABI from "../abis/MarketPlaceAbi";
import TokenABI from "../abis/TokenAbi";
import { ethers } from "ethers";
import axios from "axios";
import { marketPlaceAddress,tokenAddress } from "../addess";

function Home() {
  const [account, setAccount] = useState("");
  const [loadingState, setLoadingState] = useState("loaded");
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    if (nfts <= 0) {
      getAll();
    }
  });
  const buyNFT = async (nftId,price,seller) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const TokenInstance = new ethers.Contract(tokenAddress,TokenABI,signer)
    const checkAllowance = await TokenInstance.allowance(account,marketPlaceAddress)
    // console.log(ethers.utils.parseEther("100"));
    if(checkAllowance < ethers.utils.parseEther("100")){
      const allowanceTx = await TokenInstance.approve(marketPlaceAddress,ethers.utils.parseEther("100"))
      setLoadingState("Loading")
      await allowanceTx.wait()
      setLoadingState("loaded")
    }
    const MarketPlaceInstance = new ethers.Contract(
      marketPlaceAddress,
      MarketPlaceABI,
      signer
    );
    const transeferFromTx = await MarketPlaceInstance.buynft(seller,account,nftId,ethers.utils.parseEther(price))
    setLoadingState("Loading")
    await transeferFromTx.wait()
    setLoadingState("loaded")
    // console.log(checkAllowance,await TokenInstance.allowance(account,marketPlaceAddress));
  };
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

  
  if (nfts.length <= 0)
    return (
      <Container class="fs-1 text-center" style={{ width: "64rem" }}>
        Market Place is Empty
      </Container>
    );

  if(loadingState === "Loading") return <Spinner animation="border" />
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
                      onClick={() => buyNFT(nft,i.price,i.seller)}
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

export default Home;
