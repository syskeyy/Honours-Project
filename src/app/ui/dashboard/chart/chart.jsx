"use client";
import styles from "./chart.module.css"
import React from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      Health: 100,
    },
    {
      name: 'Page B',
      Health: 50,
    },
    {
      name: 'Page C',
      Health: 50,
    },
    {
      name: 'Page D',
      Health: 40,
    },
    {
      name: 'Page E',
      Health: 30,
    },
    {
      name: 'Page F',
      Health: 100,
    },
    {
      name: 'Page G',
      Health: 90,
    },
  ];


  const Chart = () => (
    <div className={styles.container}>
    <h2 className={styles.title}>Bike Maintanence Breakdown</h2>
    <ResponsiveContainer width="99%" height="100%" >
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
            }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{border: "none", background: "none"}}/>
            <Legend />
            <Line type="monotone" dataKey="Health" stroke="#02a141" activeDot={{ r: 8 }} />
        </LineChart>
    </ResponsiveContainer>
    </div>
);

export default Chart