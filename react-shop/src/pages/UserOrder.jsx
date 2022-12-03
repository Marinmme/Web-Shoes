import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import util from "../Util/util";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import orderApi from "../api/orderApi";
import OrderItem from "../components/OrderItem";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Tb = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;

const UserOrder = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await orderApi.getUserOrder(user._id);
        setOrders(response.order);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderList();
  }, []);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR ORDER</Title>
        <Top>
          <TopButton onClick={() => navigate("/product-list")}>
            CONTINUE SHOPPING
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {orders.length !== 0 ? (
              orders.map((item, index) => <OrderItem key={index} item={item} />)
            ) : (
              <>
                <br />
                <br />
                <br />
                <Tb>Orders empty</Tb>
              </>
            )}
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default UserOrder;
