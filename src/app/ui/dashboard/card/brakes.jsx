"use client";
import styles from "./card.module.css"
import { IoMdStopwatch  } from "react-icons/io";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { UpdateBrakeHealth } from "../../../lib/actions";
import {updateExperiance} from "../../../lib/actions";
import { ToastContainer, toast } from 'react-toastify';

const Brakes = ({ brakehealth, brakeLifespan}) => {
    const [value, setValue] = useState(brakehealth); 
    const [isVisible, setIsVisible] = useState(false);

    const onReset = async () => {
        try {
            const health = await UpdateBrakeHealth();
            if (value < 100) {
               await updateExperiance();
               toast.success("🚲 Brake health has been reset successfully!");
            }
            else {
                toast.warning("Brake health is already at 100%");
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
            <IoMdStopwatch  size={20}/>
            <span className={styles.title}>Brakes</span>
        </div>
        <div 
            className={styles.informationContainer}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <div className="tooltip-icon">
                <IoMdInformationCircleOutline size={20} />
            </div>
            {isVisible && (
                <div className="tooltip">
                    Your brakes are without a doubt one of the most important parts of your bike. They must be clean, in good condition and properly adjusted before every ride. <br></br><br></br>Over time and after lots of miles on the trail or road, disc brakes lose some of their effectiveness. This leads to longer response times, less efficient braking and less bike control. <br></br><br></br><a href="https://www.youtube.com/watch?v=Xqw0SaZl-jo&list=PLGCTGpvdT04TW0Qi4wpGxYB2TuzJok9l5"><b>Click here for more information on brake servicing</b></a> <FiExternalLink/>
                </div>
            )}
        </div>
        {!isVisible && (
            <>
                <div className={styles.texts}>
                    <div className={styles.gauge}>
                        <SimpleGauge value={parseFloat(value.toFixed(2))}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
                    </div>    
                    <span className={styles.remaining}>Lifespan: {brakeLifespan}km </span>
                </div>
                <button className={styles.cardButton} onClick={onReset}>Reset Service</button>
            </>
        )}
    </div>
    )
}

export default Brakes