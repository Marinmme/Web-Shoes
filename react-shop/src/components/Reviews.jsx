import React from 'react'
import styled from "styled-components";
import { useState, useEffect } from 'react';
import commentApi from '../api/commentApi';
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  background-color: rgb(0,0,0,0.05);
  border-radius: 10px;
  margin: 20px 20px;
  padding: 20px 20px;
`;
 

const Rate = styled.div`
    font-size: large;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;

const Name = styled.h4`
    font-size: 25px;
    padding: 10px 0px;
`;

const Text = styled.p`
    padding: 10px 30px;
`;

const Date = styled.p`
    font-style: italic;
    font-size: 13px;
    margin: 20px 0px;

`;

const Hr = styled.hr`
  background-color: #eee;
  height: 1px;
`;

const Reviews = ({productDetailId}) => {

  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const response = await commentApi.getCommentByProduct(productDetailId);
        setReview(response.comment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviewList();
  }, []);

  return (
    <Container>
      {review.map((item) => 
      <>
    <Rate >Evaluate: 
        &nbsp;         
        {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <> 
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (item?.star) ? "#ffc107" : "#e4e5e9"
                    }
                    size={30}
                  />
                </>
              );
            })}
    </Rate>
    <Name>{item.user?.name}</Name>
    <Text>
        {item?.text}
    </Text>
    <Date>Date: {item?.createdAt}</Date>
    <Hr />
    </>
    )}
    </Container>
  )
}

export default Reviews