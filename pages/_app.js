import '../styles/globals.css';
import React from 'react';
import NavBar from '../components/NavBar';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
