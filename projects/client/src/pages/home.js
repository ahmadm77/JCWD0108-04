import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {ItemCard, ListCategories, NavbarComponents, ResultComponents} from "../components"
import Axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([1]);
  // const [pickedCat, setPickedCat] 
  const getProducts = async () =>{
    try {
      // localhost:8000/api/user/products
      const response = await Axios.get(`http://localhost:8000/api/user/products`);
      // const response = await Axios.get(`http://localhost:8000/api/user/products?categoryId=${category}`);
      setProducts(response.data.getProducts);
    } catch (error) {
      console.log(error);
    }    
  }

  //pengerjaan disini
  const addToCart = async (value) => {
    // console.log("Menu :",value);
    try {
      const cart = {
        qty : 1,
        totalPrice : value.productPrice,
        value
      }

      console.log(cart);
      // const response = await Axios.post("");
    } catch (error) {
      console.log(error);
    }
  }

  const changeCategory = async (value) => {
    try {
      setProducts([]);
      setCategory(value); 
      // localhost:8000/api/user/products
      const response = await Axios.get(`http://localhost:8000/api/user/products?categoryId=${value}`);
      setProducts(response.data.getProducts);
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(()=>{
    getProducts();
    addToCart();
  }, []);
  
  function formatRupiah(number) {
    var formattedRupiah = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedRupiah}`;
  }
  return( 
    <>
    <NavbarComponents />
    <div className="mt-3">
      <Container fluid>
        <Row>
          <ListCategories 
            changeCategory = {changeCategory}
            pickedCategory= {category}
          />
          <Col>
            <h4><strong>Qyuu's Menu</strong></h4>
            <hr />
            {products.length > 0 ? (
              <Row xs={1} sm={4} md={3} lg={5} className="g-2">
                {products.map((value)=>{
                  return(
                    <ItemCard 
                    key={value.id}
                    details={value}
                    addToCart={addToCart}
                    />
                  )
                })}
              </Row>
            ):(<p></p>)}
          </Col>
          <ResultComponents />
        </Row>
      </Container>
    </div>
 </>
  );
}

export default Home;

