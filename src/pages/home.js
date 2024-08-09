import React from "react";
import { Link } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import SmallMap from './components/smallMap';

const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;

const defaultCenter = {
  lat: 55.9520553,
  lng: -3.1749664
};


const Home = () => {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAP_API_KEY
  })

  return (
    <div className="screen">

      <div className="banner">
        <div className="welcome">
          <h1 className="wel-1">Welcome to Representitive Finder</h1>
          <p className="wel-2">
            This app aims to help users find their constituency's representitives for UK and Scottish Parliament and understand their responsibilities.
          </p>
        </div>
      </div>

      <div className="Map-section">
        <div className="map-sample">
          <Link class="map-link" to="/up">{isLoaded ? <SmallMap center={defaultCenter} /> : <h1>Loading...</h1>}</Link>
        </div>
        <div className="map-text-area">
          <h1 className="map-text">Find information about your local representitive!</h1>
        </div>
      </div>
    </div>
  )
};

export default Home;
