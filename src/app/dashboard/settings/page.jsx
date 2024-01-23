import styles from "../../ui/dashboard/settings/settings.module.css"

const Settings = () => {

    return (
      <div className={styles.container}>
        <form className={styles.form}>
           <div className={styles.checkboxContainer}>
            <input type="checkbox" id="notifications" name="notifications" />
            <label className={styles.checkboxLabel} htmlFor="notifications">Don't Receive Email Notifications</label>
          </div>
          <label className={styles.label} htmlFor="notificationThreshold">Threshold of notifications</label>
          <select id="notificationThreshold" name="notificationThreshold">
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
            <option value="100">100%</option>
          </select>
          <label className={styles.label} htmlFor="drivetrainLifespan">Select drivetrain lifespan before needing service</label>
          <select id="drivetrainLifespan" name="drivetrainLifespan">
            <option value="1">Every ride</option>
            <option value="2">Every 2 rides</option>
            <option value="3">Every 3 rides</option>
            <option value="4">Every 4 rides</option>
            <option value="5">Every 5 rides</option>
            <option value="10">Every 10 rides</option>
            <option value="15">Every 15 rides</option>
            <option value="20">Every 20 rides</option>
          </select>
          <label className={styles.label} htmlFor="drivetrainLifespan">Select brake lifespan before needing service</label>
          <select id="drivetrainLifespan" name="drivetrainLifespan">
            <option value="1">Every ride</option>
            <option value="2">Every 2 rides</option>
            <option value="3">Every 3 rides</option>
            <option value="4">Every 4 rides</option>
            <option value="5">Every 5 rides</option>
            <option value="10">Every 10 rides</option>
            <option value="15">Every 15 rides</option>
            <option value="20">Every 20 rides</option>
          </select>
          <label className={styles.label} htmlFor="drivetrainLifespan">Select tyre lifespan before needing service</label>
          <select id="drivetrainLifespan" name="drivetrainLifespan">
            <option value="1">Every ride</option>
            <option value="2">Every 2 rides</option>
            <option value="3">Every 3 rides</option>
            <option value="4">Every 4 rides</option>
            <option value="5">Every 5 rides</option>
            <option value="10">Every 10 rides</option>
            <option value="15">Every 15 rides</option>
            <option value="20">Every 20 rides</option>
          </select>
          <label className={styles.label} htmlFor="drivetrainLifespan">Select bicycle clean lifespan before needing service</label>
          <select id="drivetrainLifespan" name="drivetrainLifespan">
            <option value="1">Every ride</option>
            <option value="2">Every 2 rides</option>
            <option value="3">Every 3 rides</option>
            <option value="4">Every 4 rides</option>
            <option value="5">Every 5 rides</option>
            <option value="10">Every 10 rides</option>
            <option value="15">Every 15 rides</option>
            <option value="20">Every 20 rides</option>
          </select>
          <button className={styles.submitButton}>Submit</button>
        </form>
      </div>
      
    )
  } 
  
export default Settings 