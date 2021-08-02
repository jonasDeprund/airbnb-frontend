import React from 'react';
import { sanityClient } from '../../sanity';
import { isMultiple } from '../../utils';

const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) => {
  // const reviewAmount = reviews.lenght;
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <h2>
        <b>
          {propertyType} hosted by {host?.name}
        </b>
      </h2>
      <h4>
        {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)}
      </h4>
      <hr />
      <h4>
        <b>Enhance Clean</b>
      </h4>
      <p>This host is commited to Airbnb's 5 step enhanced cleaning process</p>
      <h4>
        <b>Amenities for everyday living</b>
      </h4>
      <p>The host as equipped this place for long stays - kitchen, shampoo</p>
      <h4>
        <b>House rules</b>
      </h4>
      <p>This place isn't suitable for pets</p>
      <div className="price-box">
        <h2>{pricePerNight}€</h2>
        <h4>{/* {reviewAmount} review{isMultiple(reviewAmount)} */}</h4>
        <div className="button" onClick={() => {}}>
          Change dates
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const client = sanityClient.withConfig({ apiVersion: '2021-06-07' });

  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
      title,
      location,
      propertyType,
      mainImage,
      images,
      pricePerNight,
      beds,
      bedrooms,
      description,
      host->{
        _id,
        name,
        slug,
        image
      },
      reviews[]{
        ...,
        traveller->{
          _id,
          name,
          slug,
          image
        }
      }
    }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title || null,
        location: property.location || null,
        propertyType: property.propertyType || null,
        mainImage: property.mainImage || null,
        images: property.images || null,
        pricePerNight: property.pricePerNight || null,
        beds: property.beds || null,
        bedrooms: property.bedrooms || null,
        description: property.description || null,
        host: property.host || null,
        reviews: property.reviews || null,
      },
    };
  }
};

export default Property;
