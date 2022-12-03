import styled from "styled-components";
import Announcement from "../components/Announcement";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import util from "../Util/util";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, LOAD_INFO } from "../redux/cartSlice";
import StripeCheckout from "react-stripe-checkout";
import checkoutApi from "../api/checkoutApi";

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

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  width: 50%;
  flex: 3;
`;

const Summary = styled.div`
  width: 50%;
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span`
  font-size: 25px;
  font-weight: 400;
`;

const Radio = styled.input`
  margin-right: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Tb = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;

const KEY =
  "pk_test_51LNuJjCdrvSKmq8DcrO1UnYwnKPwg6lkuqrZyIuEZ0D6PnIq9hODR7ZMrHUhkuzDHKqGgnIT7rC1mNEVoGf1jelZ00loIW08EX";

const Cart = () => {
  const cart = useSelector((state) => state.shop.cart);
  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [totalSale, setTotalSale] = useState(0);
  const [totalPriceR, setTotalPriceR] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await checkoutApi.checkout({
          tokenId: stripeToken.id,
          amount: price,
        });
        console.log(res);
        dispatch(LOAD_INFO(res));
        navigate("/Success");
      } catch (error) {
        console.log(error);
      }
    };

    let items = 0;
    let price = 0;
    let priceR = 0;
    let sale = 0;

    cart?.forEach((item) => {
      items += item.qty;
      priceR += item.qty * item.price;
      sale += item.sale;
      price += item.qty * (item.price - (item.price * item.sale) / 100);
    });

    setTotalItems(items);
    setTotalPriceR(priceR);
    setTotalPrice(price);
    setTotalSale(sale);
    stripeToken && makeRequest();
  }, [
    cart,
    totalPrice,
    totalSale,
    totalPriceR,
    totalItems,
    setTotalPrice,
    setTotalItems,
    stripeToken,
  ]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/product-list")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({totalItems})</TopText>
            <TopText>Your Wishlist (0)</TopText>
            <TopText onClick={() => dispatch(CLEAR_CART())}>
              Empty the cart
            </TopText>
          </TopTexts>
          <TopTexts>
            <TopText>Payment Method: </TopText>
            <Radio
              type="radio"
              value="cash"
              name="paymentMethod"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash &ensp;
            <Radio
              type="radio"
              value="card"
              name="paymentMethod"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Card
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.length !== 0 ? (
              cart.map((item, index) => <CartItem key={index} item={item} />)
            ) : (
              <>
                <br />
                <br />
                <br />
                <Tb>Empty cart</Tb>
              </>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{util(totalPriceR)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Percent Discount</SummaryItemText>
              <SummaryItemPrice>-{totalSale}%</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Reduction Amount</SummaryItemText>
              <SummaryItemPrice>
                -{util(totalPriceR - totalPrice)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{util(totalPrice)}</SummaryItemPrice>
            </SummaryItem>
            {user ? (
              cart.length === 0 ? (
                <Button onClick={() => navigate("/Product-List")}>
                  CHECKOUT NOW
                </Button>
              ) : paymentMethod === "card" ? (
                <StripeCheckout
                  name="Nike Shop"
                  image="https://w7.pngwing.com/pngs/141/850/png-transparent-nike-logo-movement-brands-nike-thumbnail.png"
                  billingAddress
                  shippingAddress
                  description={`Your total is ${util(totalPrice)}`}
                  amount={totalPrice}
                  currency="VND"
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
              ) : (
                <Button onClick={() => navigate("/PaymentCash")}>
                  CHECKOUT NOW
                </Button>
              )
            ) : (
              <Button onClick={() => navigate("/Login")}>CHECKOUT NOW</Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
