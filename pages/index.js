import React from 'react';
import { sanityClient } from '../sanity';

const Home = ({ properties }) => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

// Synchronize backend and frontend
export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
};

export default Home;
