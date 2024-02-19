import styles from "../../ui/dashboard/settings/settings.module.css"
import React from "react";
import { addSettings } from "../../lib/actions"
import {
  MdOutlineNotificationsNone,
  MdStarOutline,
  MdSearch,
} from "react-icons/md";

// this is a table page that displays a settings form for users to fill. when user user submits, it activates the form action to upload the new settings data to the database.
const Settings = async() => {

    return (
      <div className={styles.container}>
        <div className={styles.banner}>
        </div>
        <form action={addSettings} className={styles.form}>
          <div className={styles.checkboxContainer}>
            <input className={styles.toggle} name="checkbox" type="checkbox" />
            <label className={styles.labelCheckbox} htmlFor="drivetrainLifespan">Disable notifications</label>
          </div>
          <label className={styles.label} htmlFor="drivetrainLifespan">Select drivetrain lifespan before needing service</label>
          <select id="drivetrainLifespan" name="drivetrainLifespan">
            <option value="10">10km</option>
            <option value="25">25km</option>
            <option value="50">50km</option>
            <option value="75">75km</option>
            <option value="100">100km</option>
            <option value="200">200km</option>
            <option value="300">300km</option>
            <option value="400">400km</option>
            <option value="500">500km</option>
          </select>
          <label className={styles.label} htmlFor="brakeLifespan">Select brake lifespan before needing service</label>
          <select id="brakeLifespan" name="brakeLifespan">
          <option value="10">10km</option>
            <option value="25">25km</option>
            <option value="50">50km</option>
            <option value="75">75km</option>
            <option value="100">100km</option>
            <option value="200">200km</option>
            <option value="300">300km</option>
            <option value="400">400km</option>
            <option value="500">500km</option>
          </select>
          <label className={styles.label} htmlFor="tyreLifespan">Select tyre lifespan before needing service</label>
          <select id="tyreLifespan" name="tyreLifespan">
          <option value="10">10km</option>
            <option value="25">25km</option>
            <option value="50">50km</option>
            <option value="75">75km</option>
            <option value="100">100km</option>
            <option value="200">200km</option>
            <option value="300">300km</option>
            <option value="400">400km</option>
            <option value="500">500km</option>
          </select>
          <label className={styles.label} htmlFor="bikeLifespan">Select bicycle clean lifespan before needing service</label>
          <select id="bikeLifespan" name="bikeLifespan">
          <option value="10">10km</option>
            <option value="25">25km</option>
            <option value="50">50km</option>
            <option value="75">75km</option>
            <option value="100">100km</option>
            <option value="200">200km</option>
            <option value="300">300km</option>
            <option value="400">400km</option>
            <option value="500">500km</option>
          </select>
          <button className={styles.submitButton}>Submit</button>
        </form>
      </div>
      
    )
  } 
  
export default Settings 