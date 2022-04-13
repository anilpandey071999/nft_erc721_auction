import { Form, Button, Container } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function AddNFT() {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control
            type="file"
            onChange={async (e) => {
              const file = e.target.files[0];
              try {
                const added = await client.add(file, {
                  progress: (prog) => console.log(`received: ${prog}`),
                });
                console.log(added);
                const url = `https://ipfs.infura.io/ipfs/${added.path}`;
                console.log(url);
              } catch (error) {
                console.log(error);
              }
              console.log("Hello MatherFucker King is Back");
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddNFT;
