import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";


const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 0px;
  margin-top: 100px;
`;

const Light = styled.div`
  height: 1px;
  background-color: #0cafe1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`; 

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;
const Home = () => {

  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    const fetchNewProductList = async () => {
      try {
        const response = await productApi.getProductByNew(1);
        setNewProducts(response.productDetails);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProductList = async () => {
      try {
        const response = await productApi.getAll();
        setSaleProducts(response.productDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
    fetchNewProductList();
  }, []);


  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <center>
      <Title>Sale Off</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      </center>
      <Products products = {saleProducts.filter(item => item.sale !== 0)}/>
      <Newsletter/>
      <center>
      <Title>New Products</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      </center>
      <Products products = {newProducts}/>
      <Light/>
      <center>
      <Title>More Nike</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      </center>
      <Categories />
      <Footer/>
    </div>
  )
};

export default Home;
