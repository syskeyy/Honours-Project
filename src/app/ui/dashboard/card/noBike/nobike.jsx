"use client";
import styles from "../card.module.css"
import { IoIosBicycle  } from "react-icons/io";
import Link from "next/link";

const NoBike = () => {
    return (
    <div className={styles.noBikeContainer}>
        <div className={styles.titleContainer}>
            <IoIosBicycle  size={20}/>
            <span className={styles.title}>No Bicycle Detected!</span>
        </div>
        <div className={styles.informationContainer}>
        </div>
        <div className={styles.texts}>
            <span className={styles.remaining}>To start, please add in a bicycle to start tracking. </span>
            <span className={styles.remaining}>Dont forget to add in your rides and configure your settings too! </span>

            <Link href="/dashboard/bicycles/add">
                <button className={styles.cardButtonNoBike}>Add new bicycle</button>
            </Link>
        </div>
    </div>
    )
}

export default NoBike