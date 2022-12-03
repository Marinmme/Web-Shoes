import styled from "styled-components";
import UseForm from "../components/UseForm";
import validate from "../components/validateInfo";

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

const Label = styled.a`
  font-size: 15px;
  margin-left: 2px;
  margin-top: 20px;
`;

const ChangePass = () => {
  const { handleChange, handleChangePass, values, errors } = UseForm(validate);
  return (
    <Container>
      <Wrapper>
        <Title>Change Password</Title>
        <Form onSubmit={handleChangePass}>
          
          <Label>Old Password</Label>
          <Input
            type="password"
            name="oldpassword"
            placeholder="password"
            value={values.oldpassword}
            onChange={handleChange}
          />
          {errors.oldpassword && <P>{errors.oldpassword}</P>}

          <Label>New Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <P>{errors.password}</P>}

          <Label>Confirm new Password</Label>
          <Input
            type="password"
            name="confirmpassword"
            placeholder="confirm password"
            value={values.confirmpassword}
            onChange={handleChange}
          />
          {errors.confirmpassword && <P>{errors.confirmpassword}</P>}

          <Button type="submit">CHANGE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ChangePass;
