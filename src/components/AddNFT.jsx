import { Form, Button, Container, Alert } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState } from "react";
import MarketPlaceABI from "../abis/MarketPlaceAbi";
import { ethers } from "ethers";
/**
Minddef NFT deployed to: 0x1DB0400CF13b187f5463beea1E32f7221205BE0B
Minddef Token deployed to: 0x3fA15435527f1d272e10D3e1C68bC622Ea2a5712
Minddef Market Place deployed to: 0x07470D0B1080C3e11189cedC6041fA1396F33Bb3
*/
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const marketPlaceAddress = "0x07470D0B1080C3e11189cedC6041fA1396F33Bb3";
function AddNFT() {
  const [NFT_URI, setNFT_URI] = useState("");
  const [Error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [cheked, setCheked] = useState(false);
  const [formInput, updateFormInput] = useState({
    name: "",
    price: "",
    description: "",
    autionBasePrice: "",
    openForAuction: "",
    stratAutionTiming: "",
    endAutionTiming: "",
    uri: NFT_URI,
  });

  const onChange = async (e) => {
    try {
      const file = e.target.files[0];
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFormInput({ ...formInput, uri: url });
      setNFT_URI(url);
    } catch (error) {
      // console.log(error);
      setError(error);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
    }
    console.log("Hello MatherFucker King is Back");
  };

  const submitData = async () => {
    const {
      name,
      price,
      description,
      autionBasePrice,
      stratAutionTiming,
      endAutionTiming,
    } = formInput;
    if (!name || !description || !price) {
      setError("Provid Valid data");
      setIsError(true);
      setInterval(() => {
        setError("");
        setIsError(false);
      }, 3000);
    } else {
      try {
        // console.log("formInput");
        // console.log(formInput);
        const data = JSON.stringify(formInput);
        const added = await client.add(data);
        console.log("data:-", data);
        console.log(added);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const MarketPlaceInstance = new ethers.Contract(
          marketPlaceAddress,
          MarketPlaceABI,
          signer
          );
        let addNftCollection;

        cheked
          ? (addNftCollection = await MarketPlaceInstance.addNftCollection(
              price,
              autionBasePrice,
              cheked,
              stratAutionTiming,
              endAutionTiming,
              url
            ))
          : (addNftCollection = await MarketPlaceInstance.addNftCollection(
              price,
              0,
              cheked,
              0,
              0,
              url
            ));
        // console.log(addNftCollection);
        // console.log("aa=? ",a)
        setError(`${addNftCollection.hash}`);
        setShow(true);
      } catch (error) {
        setError(`${error}`);
        setIsError(true);
      }
      setTimeout(() => {
        setError("");
        setShow(true);
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <Container>
      <Alert show={isError} variant="danger">
        {Error}
      </Alert>
      <Alert show={show} variant="success">
        {Error}
      </Alert>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
          <Form.Text>Asset Price in Eth</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />
          <Form.Text>Description Of your NFT</Form.Text>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload your NFT file</Form.Label>
          <Form.Control type="file" onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Want to Auction your NFT"
            onChange={() => {
              cheked ? setCheked(false) : setCheked(true);
              updateFormInput({ ...formInput, openForAuction: cheked });
            }}
          />
        </Form.Group>

        {cheked && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Strat of aution timing</Form.Label>
            <Form.Control
              type="text"
              show={cheked}
              placeholder="Start Time"
              onChange={(e) =>
                updateFormInput({
                  ...formInput,
                  stratAutionTiming: e.target.value,
                })
              }
            />
            <Form.Text>Description Of your NFT</Form.Text>
          </Form.Group>
        )}

        {cheked && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>End of aution timing</Form.Label>
            <Form.Control
              type="text"
              show={cheked}
              placeholder="End TIme"
              onChange={(e) =>
                updateFormInput({
                  ...formInput,
                  endAutionTiming: e.target.value,
                })
              }
            />
            <Form.Text>Description Of your NFT</Form.Text>
          </Form.Group>
        )}

        {cheked && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Aution Base Price</Form.Label>
            <Form.Control
              type="text"
              show={cheked}
              placeholder="Aution Base Price"
              onChange={(e) =>
                updateFormInput({
                  ...formInput,
                  autionBasePrice: e.target.value,
                })
              }
            />
            <Form.Text>Asset Price in Eth</Form.Text>
          </Form.Group>
        )}
        <Button onClick={() => submitData()}>Submit</Button>
      </Form>
    </Container>
  );
}

export default AddNFT;
