"use client";
import styles from "./card.module.css"
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';
import {Tooltip} from "./Tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { UpdateTyreHealth } from "../../../lib/actions";
import {updateExperiance} from "../../../lib/actions";
import { ToastContainer, toast } from 'react-toastify';

const Tyres = ({ tyrehealth, tyreLifespan}) => {
    const [value, setValue] = useState(tyrehealth); 

    const onReset = async () => {
        try {
            const health = await UpdateTyreHealth();
            if (value < 100) {
               await updateExperiance();
                toast.success("🚲 Tyre health has been reset successfully!");
            }
            else {
                toast.warning("Tyre health is already at 100%");
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
            <MdOutlineTireRepair  size={20}/>
            <span className={styles.title}>Tyres</span>
        </div>
        <div className={styles.informationContainer}>
            <Tooltip text="Pumping your tire can be a crucial yet forgotten part of maintaining a bicycle. Sometimes you can go for weeks without adding some air into your wheel. This situation can cause a great failure when riding.">
                <div className="tooltip-icon">
                    <IoMdInformationCircleOutline size={20} />
                </div>
            </Tooltip>
        </div>
        <div className={styles.texts}>
            <div className={styles.gauge}>
                <SimpleGauge value={value}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
            </div>    
            <span className={styles.remaining}>Wears by: {tyreLifespan}%</span>
        </div>
        <button className={styles.cardButton} onClick={onReset}>Reset Service</button>
    </div>
    )
}

export default Tyres