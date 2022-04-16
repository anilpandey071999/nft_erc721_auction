import React, { useEffect, useState } from "react";
import {
  ListGroupItem,
  Button,
  Container,
  Alert,
  Card,
  ListGroup,
} from "react-bootstrap";
import MarketPlaceABI from "../abis/MarketPlaceAbi";
import { ethers } from "ethers";

const marketPlaceAddress = "0x07470D0B1080C3e11189cedC6041fA1396F33Bb3";

function Home() {
 const [loadingState, setLoadingState] = useState("not-loaded");
  const [nfts, setNfts] = useState([]); 
   useEffect(()=>{
    getAll()
  })
  const getAll = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const MarketPlaceInstance = new ethers.Contract(
      marketPlaceAddress,
      MarketPlaceABI,
      signer
      );
    let a = await MarketPlaceInstance.getListedNft()
  };

  if(nfts.length <= 0) return(<Container class="fs-1 text-center"  style={{width: "64rem"}}>Market Place is Empty</Container>)
  return (
    <div>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
