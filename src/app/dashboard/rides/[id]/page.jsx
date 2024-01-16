import styles from "../../../ui/dashboard/rides/viewRides/viewRides.module.css"

const ViewRidePage = () => {
    return (
        <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label} htmlFor="name">Ride Name</label>
          <input className={styles.input} id="name" name="name" type="text"/>
          <label className={styles.label} htmlFor="bicycle">Bicycle</label>
          <select className={styles.input} id="bicycle" name="bicycle">
            <option value="gravel">Vitus Substance</option>
          </select>
          <label className={styles.label} htmlFor="distance">Ride Distance</label>
          <input className={styles.input} id="distance" name="distance" type="number"/>
          <label className={styles.label} htmlFor="speed">Ride Speed</label>
          <input className={styles.input} id="speed" name="speed" type="number"/>
          <label className={styles.label} htmlFor="date">Date</label>
          <input className={styles.input} id="date" name="date" type="date"/>
          <label className={styles.label} htmlFor="time">Time</label>
          <input className={styles.input} id="time" name="time" type="time"/>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.input} id="description" rows="6"> </textarea>
          <button className={styles.submitButton}>Submit</button>
          <button className={styles.deleteButton}>Delete</button>
        </form>
      </div>
    )
  }
  
export default ViewRidePage