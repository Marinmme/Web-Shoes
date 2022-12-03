import styled from "styled-components";
import { useState, useEffect } from "react";
import sliderApi from "../api/sliderApi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 80vh;
  background-size: cover;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  padding: 0px 150px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  color: Black;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 35px;
  font-weight: 300;
  color: white;
  margin-bottom: 20px;

`;


const Button = styled.button`
    border:none;
    padding: 15px 50px;
    background-color: rgb(0,0,0,0.5);
    color:white;
    cursor: pointer;
    font-weight: 600;
`;


const Newsletter = () => {
  const navigate = useNavigate();
  const [sliderItems, setSliderItems] = useState([]);
  useEffect(() => {
    const fetchSliderList = async () => {
      try {
        const response = await sliderApi.getAll();
        console.log(response.sliders)
        setSliderItems(response.sliders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSliderList();
  }, []);
  
  const image = "https://i.ibb.co/V9nRGkN/air-jordan-1-retro-high-og-newstalgia-dj4891-061-3.webp"

  return (
    <Container image={image}>
        <Title>{sliderItems[0]?.title}</Title>
        <Desc>{sliderItems[0]?.description}</Desc>
        <Button onClick={() => navigate("/product-list")}>SHOP NOW</Button>    
    </Container>
  );
};

export default Newsletter;
