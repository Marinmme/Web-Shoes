import styled from "styled-components";
import util from "../Util/util";

const Container = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 1.3;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-right: 5px;
  padding-right: 40px;
  background-color: rgb(0,0,0,0.02);

`;

const Details = styled.div`
  padding: 50px 0px 50px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.span`
  font-size: 25px;
  padding: 5px;
`;


const PriceDetail = styled.div`
  flex: 3;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  background-color: rgb(0,0,0,0.02);
`;


const Government = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;


const ProductOrder = styled.div`

  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ImageOrder = styled.img`
  width: 200px;
`;

const DetailsOrder = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductNameOrder = styled.span``;

const ProductColorOrder = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSizeOrder = styled.span``;

const OrderItem = ({ item}) => {
  return (
    <Container>
        <ProductDetail>
          <Details>
            <Title>
              <b>ID:</b> {item._id}
            </Title>
            <Title>
              <b>Booking Time:</b> {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.parse(item.createdAt))}
            </Title>
            <Title>
              <b>Payment Status:</b> {item.paymentStatus}
            </Title>
            <Title>
              <b>Order Status:</b> {item.status}
            </Title>
            {item.paymentMethod === "cash" ? (
              <>
                <Title>
                  <b>Address:</b> {item.address}
                </Title>
                <Title>
                  <b>Payment Method:</b> {item.paymentMethod}
                </Title>
              </>
            ) : (
              <>
                <Title>
                  <b>Address:</b> {item.address.line1}
                </Title>
                <Title>
                  <b>Payment Method:</b> {item.paymentMethod.brand}
                </Title>
              </>
            )}
             <Title>
             <b>Total:</b> {util(item.amount)}
            </Title>
          </Details>
        </ProductDetail>
        <PriceDetail>
            <ProductOrder>
            {item.products.map((product) => (
                <Government>
                <ImageOrder
                src={`${process.env.REACT_APP_API_URL}/${
                    product.productDetail.productImage.split(",")[0]
                }`}
                />
                <DetailsOrder>
                <ProductNameOrder>
                    <b>Product:</b> {product.productDetail.product.name}
                </ProductNameOrder>
                <ProductColorOrder color={product.productDetail.color} />
                <ProductSizeOrder>
                    <b>Size:</b> {product.size}
                </ProductSizeOrder>
                <ProductSizeOrder>
                    <b>Quantity:</b> {`x ${product.quantity}`}
                </ProductSizeOrder>
                <ProductSizeOrder>
                    <b>Price:</b> {util(product.price)}
                </ProductSizeOrder>
                <ProductSizeOrder>
                    <b>Total:</b> {util(product.total)}
                </ProductSizeOrder>
                </DetailsOrder>
                </Government>
            ))}
            </ProductOrder>
        </PriceDetail>  
    </Container>
  );
};

export default OrderItem;
