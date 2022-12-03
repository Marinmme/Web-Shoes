import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import { useState } from "react";
import productApi from "../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import util from "../Util/util";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Light = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const categories = useSelector((state) => state.shop.category);
  const t = useSelector((state) => state.shop.products);
  const [products, setProducts] = useState([]);

  const handleChangeColor = (e) => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByColor(e.target.value);
        setProducts(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  const handleChangeGender = (e) => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByGender(e.target.value);
        setProducts(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  const handleChangeCategory = (e) => {
    setProducts(
      t.filter((item) => {
        if (item.product.category._id === e.target.value) return item;
      })
    );
  };

  const handleSortByPrice = (e) => {
    var price = {};
    if (e.target.value === "<3000000") price = { from: 0, to: 2999999 };
    else if(e.target.value === "3000000->5000000") price = { from: 3000000, to: 5000000 };
    else if(e.target.value === ">5000000") price = { from: 5000001, to: 10000000 };
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByQuery(price);
        setProducts(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>NIKE - Just Do It.</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select onChange={(e) => handleChangeColor(e)}>
            <Option disabled selected>
              Color
            </Option>
            <Option value="White">White</Option>
            <Option value="Black">Black</Option>
            <Option value="Red">Red</Option>
            <Option value="Brown">Brown</Option>
            <Option value="Blue">Blue</Option>
            <Option value="Yellow">Yellow</Option>
            <Option value="Green">Green</Option>
            <Option value="Orange">Orange</Option>
          </Select>
          <Select onChange={(e) => handleChangeGender(e)}>
            <Option disabled selected>
              Gender
            </Option>
            <Option value="1">Men</Option>
            <Option value="0">Women</Option>
          </Select>
          <Select onChange={(e) => handleChangeCategory(e)}>
            <Option disabled selected>
              Category
            </Option>
            {categories.map((category) => (
              <Option value={category._id} key={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort by:</FilterText>
          <Select onChange={(e) => handleSortByPrice(e)}>
            <Option disabled selected>
              --Sort--
            </Option>
            <Option value="<3000000">Price: {`<${util(3000000)}`}</Option>
            <Option value="3000000->5000000">
              Price: {`${util(3000000)}->${util(5000000)}`}
            </Option>
            <Option value=">5000000">Price: {`>${util(5000000)}`}</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={products} />
      <Newsletter />
    
      <Footer />
    </Container>
  );
};

export default ProductList;
