"use client";
import styles from "./card.module.css"
import { IoIosBicycle  } from "react-icons/io";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { UpdateBikeHealth } from "../../../lib/actions";
import {updateExperiance} from "../../../lib/actions";
import { ToastContainer, toast } from 'react-toastify';
// Simple gauge > https://www.npmjs.com/package/react-gauges
// Toastify > https://www.npmjs.com/package/react-toastify

// The bicycle components are client components that are located here and are displayed on the dashboard page. The bicycle components are the main logic of the app. It uses states of the bicycle health and lifespan to display the health of the bicycle. The bicycle health is updated when the user clicks on the reset service button
// The rest of the components such as brakes, drivetrain, and tyres work the exact same way, the only thing that change are the functions it calls and the icons it uses. The information displayued when gets passed into the tooltip component changes too.

// Use states references from https://legacy.reactjs.org/docs/hooks-state.html
const Bike = ({ bikehealth, bikeLifespan }) => {
    // Setting state variables
    const [value, setValue] = useState(bikehealth); 
    const [isVisible, setIsVisible] = useState(false);

    const onReset = async () => {
        try {
            const health = await UpdateBikeHealth();
            if (value < 100) {
            // If value is less than 100, then perform the updateExperiance function from lib. The toastify library is used to display a message to the user when the reset service button is clicked. The tooltip component is also used to display a message to the user when they hover over the 'i' icon. The information displayed is just some information about the component and how to maintain it
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
    // This bit sets the colour of the gauge depending on the value of the health. If health is less than 25 the colour will be red. If health is less than 50 the colour will be orange. If health is greater than 50 the colour will be green
    const getLabelColor = (value) => {
        if (value < 25) {
            return "#ff4c4c"; 
        } else if (value < 50) {
            return "#ffb200"; 
        } else {
            return "#02a141"; 
        }
    };
    // This bit will conditionally render depending if user is hovering over the tooltip icon. Otherwise the gauge will be displayed
    return (
    <div className={styles.container}>
        <div className={styles.titleContainer}>
            <IoIosBicycle  size={20}/>
            <span className={styles.title}>Bike</span>
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
                    Your bike is a collection of moving parts. When exposed to mud, grime and debris, these parts begin to deteriorate. <br></br> <br></br>If you spend a lot of time riding in wet, muddy conditions, or if you ride hard, fast and often, plan to clean your bike more frequently. <br></br><br></br>Tools used: <ul>- Degreaser</ul><ul>- Sponge</ul><ul>- Brush</ul>
                </div>
            )}
        </div>
        {!isVisible && (
            <>
                {/* the gauge which displays the current health of the bike */}
                <div className={styles.texts}>
                    <div className={styles.gauge}>
                        <SimpleGauge value={parseFloat(value.toFixed(2))}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
                    </div>    
                    <span className={styles.remaining}>Lifespan: {bikeLifespan}km</span>
                </div>
                <button className={styles.cardButton} onClick={onReset}>Reset Service</button>
            </>
        )}
    </div>
    )
}

export default Bike