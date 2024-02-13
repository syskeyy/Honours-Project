"use client";
import styles from "./card.module.css"
import { IoIosBicycle  } from "react-icons/io";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';
import {Tooltip} from "./Tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { UpdateBikeHealth } from "../../../lib/actions";
import {updateExperiance} from "../../../lib/actions";
import { ToastContainer, toast } from 'react-toastify';

const Bike = ({ bikehealth, bikeLifespan }) => {
    const [value, setValue] = useState(bikehealth); 

    const onReset = async () => {
        try {
            const health = await UpdateBikeHealth();
            if (value < 100) {
               await updateExperiance();
               toast.success("🚲 Bike health has been reset successfully!");
            }
            else {
                toast.warning("Bike health is already at 100%");
            }
            setValue(health);
        } catch (err) {
            console.log('Error in onReset:', err);
        }
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
        <div className={styles.informationContainer}>
             <Tooltip text="Your bike is a collection of moving parts. When exposed to mud, grime and debris, these parts begin to deteriorate. If you spend a lot of time riding in wet, muddy conditions, or if you ride hard, fast and often, plan to clean your bike more frequently. ">
                <div className={styles.TooltipIcon}>
                    <IoMdInformationCircleOutline size={20}/>
                </div>
            </Tooltip>
        </div>
        <div className={styles.texts}>
            <div className={styles.gauge}>
                <SimpleGauge value={value}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
            </div>    
            <span className={styles.remaining}>Wears by: {bikeLifespan}%</span>
            </div>
        <button className={styles.cardButton} onClick={onReset}>Reset Service</button>
    </div>
    )
}

export default Bike