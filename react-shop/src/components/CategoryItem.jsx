import styled from "styled-components";

import { useNavigate } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 60vh;
  position: relative;
  min-width: 500px;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #3b3939;
  font-size: 70px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 20px 35px;
  background-color: #c1bebe;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/product-list");
  };

  return (
    <Container>
      <Image
        src={`${process.env.REACT_APP_API_URL}/${item.categoryImage}`}
        key={item.id}
      />
      <Info>
        <Title>{item.name}</Title>
        <Button onClick={() => handleOnClick()}>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
