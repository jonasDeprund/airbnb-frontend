import React from 'react';
// import { urlFor } from '../../sanity';

const Review = ({ review }) => {
  console.log(review);
  return (
    <div className="review-box">
      <h1>{review.rating}</h1>
      <h2>{review.traveller}</h2>
      <img
        src={urlFor(review.traveller.image)
          .width(50)
          .height(50)
          .crop('focalpoint')
          .auto('format')}
        alt=""
      />
    </div>
  );
};

export default Review;
