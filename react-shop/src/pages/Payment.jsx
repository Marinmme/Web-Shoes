import styled from "styled-components";
import UseForm from "../components/UseForm";
import validate from "../components/validateInfo";
import { useSelector, useDispatch } from "react-redux";
import checkoutApi from "../api/checkoutApi";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART, CLEAR_INFO } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import util from "../Util/util";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.istockphoto.com/photos/photo-of-real-authentic-typeset-letters-forming-new-world-order-text-picture-id1223789287")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 96%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const P = styled.p`
  color: red;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

const Payment = () => {
  const { handleChange, values, errors } = UseForm(validate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.shop.cart);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [orderId, setOrderId] = useState(null);
  let price = 0;
        cart?.forEach((item) => {
          price += item.qty * (item.price-(item.price*item.sale/100));
        });

  const handleSubmit = (e)=>{
    e.preventDefault();
    const createOrder = async () => {
      try {
        let price = 0;
        cart?.forEach((item) => {
          price += item.qty * (item.price-(item.price*item.sale/100));
        });
        const res = await checkoutApi.order({
          user: currentUser._id,
          products: cart?.map((item) => ({
            productDetail: item._id,
            name: item.product.name,
            color: item.color,
            quantity: item.qty,
            size: item.size,
            price: item.price-(item.price*item.sale/100),
            total: (item.price-(item.price*item.sale/100)) * item.qty,
          })),
          amount: price,
          address: values.address,
          paymentMethod: "cash",
        });
        setOrderId(res._id);
      } catch {}
    };
    createOrder();
    dispatch(CLEAR_CART());
    navigate("/");
  }

  return (
    <Container>
      <Wrapper>
        <Title>Payment</Title>
        <Form onSubmit={handleSubmit}>

        <Input
            name="address"
            placeholder="address"
            value={values.address}
            onChange={handleChange}
            required
          />
          {errors.address && <P>{errors.address}</P>}

          <Input value="Payment method: cash" readOnly />

          <Input value={`Total: ${util(price)}`} readOnly />
          
          <Button type="submit">Payment</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Payment;
