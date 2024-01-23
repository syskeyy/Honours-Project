"use client";
import styles from "./card.module.css"
import { IoMdStopwatch  } from "react-icons/io";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';


const Brakes = () => {
    const [value, setValue] = useState(60); 

    const resetValue = () => {
        setValue(100); // Reset value to 0 when called
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
            <IoMdStopwatch  size={20}/>
            <span className={styles.title}>Brakes</span>
        </div>
        <div className={styles.texts}>
            <div className={styles.gauge}>
                <SimpleGauge value={value}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
            </div>    
            <span className={styles.remaining}>Rides Remaining: </span>
        </div>
        <button className={styles.cardButton} onClick={resetValue}>Reset Service</button>
    </div>
    )
}

export default Brakes