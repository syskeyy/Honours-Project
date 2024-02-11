"use client";
import styles from "./chart.module.css"
import React from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: '10/02/2024',
      Health: 100,
    },
    {
      name: '17/02/2024',
      Health: 50,
    },
    {
      name: '24/02/2024',
      Health: 50,
    },
    {
      name: '03/03/2024',
      Health: 40,
    },
    {
      name: '10/03/2024',
      Health: 30,
    },
    {
      name: '17/03/2024',
      Health: 100,
    },
    {
      name: '24/03/2024',
      Health: 90,
    },
  ];


  const Chart = () => (
    <div className={styles.container}>
    <span className={styles.title}>Bike Maintanence Breakdown</span>
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