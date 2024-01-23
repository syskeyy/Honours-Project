"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Achievements = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('../../lib/strava')
      .then(response => setData(response.data))
      .catch(console.error);
  }, []);

  const time = (data?.movingTime ?? 33456000 * 0.000277778).toFixed(2); // convert from seconds to hours
  const all = (data?.json);
  console.log(data);


  return (
    <div>
      <h1>Total Time</h1>
      <span style={{ fontSize: '30px' }}>{time}</span>
      <span>{all}</span>
    </div>
  );
};

export default Achievements;