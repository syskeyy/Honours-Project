"use client";
import styles from "./card.module.css"
import { LuCog } from "react-icons/lu";
import { MdOutlineTireRepair } from "react-icons/md";
import { BsSignStopFill } from "react-icons/bs";
import { IoBicycleOutline } from "react-icons/io5";
import { SimpleGauge } from "react-gauges";
import React, { useState } from 'react';
import {Tooltip} from "./Tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { UpdateDrivetrainHealth } from '../../../lib/actions';
import {updateExperiance} from "../../../lib/actions";
import { ToastContainer, toast } from 'react-toastify';

const Drivetrain = ({ drivetrainhealth, drivetrainLifespan }) => {
    const [value, setValue] = useState(drivetrainhealth); 

    const onReset = async () => {
        try {
            const health = await UpdateDrivetrainHealth();
            if (value < 100) {
               await updateExperiance();
                toast.success("🚲 Drivetrain health has been reset successfully!");
            }
            else {
                toast.warning("Drivetrain health is already at 100%");
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
            <LuCog size={20}/>
            <span className={styles.title}>Drivetrain</span>
        </div>
        <div className={styles.informationContainer}>
             <Tooltip text="Drivetrain maintenance can boost your riding performance and keep your cycling on budget. You may need to take care of your drivetrain more often depending on your disipline. For instance, mountain and gravel biking will require more care due to the more adverse riding conditions. Drivetrain care mostly involves degreasing, cleaning and relubing the chain">
                <div className="tooltip-icon">
                    <IoMdInformationCircleOutline size={20} />
                </div>
            </Tooltip>
        </div>
        <div className={styles.texts}>
            <div className={styles.gauge}>
                <SimpleGauge value={value}labelFontWeight="normal" barWidth={15} isTotal={true} barColor={getLabelColor(value)} labelColor="#ffffff" labelFontFamily="Poppins" labelFontSize="1.7rem" indicatorVisible={false}/>        
            </div>    
            <span className={styles.remaining}>Wears by: {drivetrainLifespan}%</span>
        </div>
        <button className={styles.cardButton} onClick={onReset}>Reset Service</button>
    </div>
    )
}

export default Drivetrain