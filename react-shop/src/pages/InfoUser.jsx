import styled from "styled-components";
import UseForm from "../components/UseForm";
import validate from "../components/validateInfo";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../api/userApi";
import { useState } from "react";
import { loginSuccess } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { lightGreen } from "@material-ui/core/colors";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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

const Label = styled.a`
  font-size: 15px;
  margin-left: 2px;
  margin-top: 20px;
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
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
`;

const Buttonn = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: burlywood;
  color: white;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
`;

const Info = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  
  const updateUser = async () => {
    try {
      await userApi.updateUser(user._id, values);
      var item = {...user};
      item.name = values.name;
      item.address = values.address;
      item.email = values.email;
      item.phone = values.phone;
      dispatch(loginSuccess(item));
    
    } catch (error) {
     console.log(error)
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };
  return (
    <Container>
      <Wrapper>
        <Title>Info user</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Name User</Label>
          <Input
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleChange}
          />
         
          <Label>Phone Number</Label>
          <Input
            type="number"
            name="phone"
            placeholder="phone"
            value={values.phone}
            onChange={handleChange}
          />
        
          <Label>Address User</Label>
          <Input
            name="address"
            placeholder="address"
            value={values.address}
            onChange={handleChange}
          />
       
          <Label>Email User</Label>
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
          />
          <Button type="submit">Update</Button>
          <Buttonn><Link to="/ChangePassword" style={{ color: "white", textDecoration: "none" }}>Change password</Link></Buttonn>
        <Buttonn><Link to="/User-Order" style={{ color: "white", textDecoration: "none" }}>View Orders</Link></Buttonn>
        </Form>

      </Wrapper>
    </Container>
  );
};

export default Info;
