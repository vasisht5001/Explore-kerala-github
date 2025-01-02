import React, { useEffect, useState } from 'react';
import LatestPost from '../Components/LatestPost';
import { get } from '../services/Endpoint';

export default function Home() {

  return (
    <>
      <div className="container-fluid bg-dark hero-section text-center">
        <h1 className="fs-1 fw-bold text-light">WELCOME TO KERALA - GOD'S OWN COUNTRY</h1>
        <p className="text-light fs-5 mt-3">
        “Kerala, a land of lush greenery, serene backwaters, and warm hearts. Happy Kerala Day to all!” “Here's to Kerala, a land where art, tradition, and nature coexist harmoniously.
        </p>
      </div>

<div className='container-fluid  p-5'>

    <LatestPost />

</div>
    </>
  );
}
