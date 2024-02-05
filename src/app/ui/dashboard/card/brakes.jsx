"use client";
import styles from "./card.module.css"
import { IoMdStopwatch  } from "react-icons/io";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';
import {Tooltip} from "./Tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { UpdateBrakeHealth } from "../../../lib/actions";

const Brakes = ({ brakehealth }) => {
    const [value, setValue] = useState(brakehealth); 

    const onReset = async () => {
        const health = await UpdateBrakeHealth();
        setValue(health);
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
        <div className={styles.informationContainer}>
            <Tooltip text="Your bike is a collection of moving parts. When exposed to mud, grime and debris, these parts begin to deteriorate. A regular schedule of maintenance (monthly, weekly or more often depending on your type of riding) is important. If you spend a lot of time riding in wet, muddy conditions, or if you ride hard, fast and often, plan to clean your bike more frequently. If you touch the chain with your finger and it comes away black and greasy, that’s a sure sign that a clean and lube are needed. Another sign is hearing excessive amounts of chain noise when you’re pedaling.">
                <div className="tooltip-icon">
                    <IoMdInformationCircleOutline size={20} />
                </div>
            </Tooltip>
        </div>
        <div className={styles.texts}>
            <div className={styles.gauge}>
                <SimpleGauge value={value}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
            </div>    
            <span className={styles.remaining}>Rides Remaining: </span>
        </div>
        <button className={styles.cardButton} onClick={onReset}>Reset Service</button>
    </div>
    )
}

export default Brakes