"use client";
import styles from "./card.module.css"
import { IoIosBicycle  } from "react-icons/io";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';


const Bike = () => {
    const [value, setValue] = useState(80); 

    const resetValue = () => {
        setValue(100); 
    };

    const getLabelColor = (value) => {
        if (value < 25) {
            return "#ff4c4c"; 
        } else if (value < 50) {
            return "#ffb200"; 
        } else {
            return "#02a141"; 
        }
    };

    return (
    <div className={styles.container}>
        <div className={styles.titleContainer}>
            <IoIosBicycle  size={20}/>
            <span className={styles.title}>Bike</span>
        </div>
        <div className={styles.texts}>
            <div className={styles.gauge}>
                <SimpleGauge value={value}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
            </div>    
            <span className={styles.remaining}>Rides Remaining: </span>
        </div>
        <button className={styles.cardButton} onClick={() => { 
        if (value <100) resetValue();
          console.log("Value reset")
        }}>Reset Service</button>
    </div>
    )
}

export default Bike