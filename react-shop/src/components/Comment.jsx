import { useState } from "react";
import { Box, Tab, Tabs, Typography, TextField } from "@material-ui/core";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";
import Reviews from "./Reviews";
import commentApi from "../api/commentApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  margin: 0px 150px;
`;

const Text = styled.h4`
  font-size: 35px;
  padding-left: 70px;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 15px 50px;
  margin: 30px 70px;
  font-size: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const Icondemo = styled.p`
  padding: 30px 130px;
`;

const Input = styled.input`
  display: none;
`;

const Note = styled.p`
  font-style: italic;
  color: lightslategray;
  padding: 10px 70px;
  display: flex;
  justify-content: flex-end;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Comment = ({ productDetailId }) => {
  const [value, setValue] = useState(0);
  const [bl, setBl] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeBL = (e) => {
    setBl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await commentApi.addComment({
          text: bl,
          user: user._id,
          productDetail: productDetailId,
          star: rating,
        });
        setBl("")
        setRating(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/Login");
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="COMMENT" {...a11yProps(0)} />
            <Tab label="REVIEWS" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={1} sx={{ innerHeight: "100px" }}>
          <Reviews productDetailId={productDetailId} />
        </TabPanel>
        <TabPanel value={value} index={0}>
          <Text>Evaluate </Text>
          <Icondemo>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label>
                  <Input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={30}
                  />
                </label>
              );
            })}
          </Icondemo>

          <Text>Comment</Text>
          <form onSubmit={handleSubmit}>
            <Box sx={{ paddingLeft: 50, width: "90%", maxWidth: "100%" }}>
              <TextField
                fullWidth
            
                id="fullWidth"
                onChange={handleChangeBL}
                value={bl}
              />
            </Box>
    
            <Button type="submit">Comment</Button>
          </form>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Comment;
