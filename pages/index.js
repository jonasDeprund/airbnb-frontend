import React from 'react';
import { sanityClient, urlFor } from '../sanity';
import Link from 'next/link';
import DashboardMap from '../components/DashboardMap';

const Home = ({ properties }) => {
  return (
    <div>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property) => (
                <Link href={`property/${property.slug.current}`}>
                  <div key={property._id} className="card">
                    <img src={urlFor(property.mainImage)} alt="" />
                    <h3>{property.title}</h3>
                    <h3>Price per night {property.pricePerNight}€</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
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
