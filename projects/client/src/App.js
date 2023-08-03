// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import {ResultComponents, ListCategories, NavbarComponents} from "./components"
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  return (
    <div className="App">
      <Home />
    </div>
    // <div className="App">
    //   <NavbarComponents />
    //   <div className="mt-3">
    //     <Container fluid>
    //     <Row>
    //       <ListCategories />
    //       <Col>
    //         <h4>Dafar Produk</h4>
    //         <hr />
    //       </Col>
    //       <ResultComponents />
    //     </Row>
    //     </Container>
    //   </div>
    // </div>
  );
}

export default App;
