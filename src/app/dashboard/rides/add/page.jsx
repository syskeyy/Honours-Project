import styles from "../../../ui/dashboard/rides/newRides/newRides.module.css"
import { addRides } from "../../../lib/actions.js"
import { fetchAllBicycle } from "../../../lib/data.js"

//This is a table page that displays a blank form for users to fill. Upon the user submit button it activates the form action to upload the new ride data to the database.
// Unlike the bicycle page, this page (ride add page) will map in a bicycle name which will get mapped out onto a select input for users to select which bicycle is associated with their ride.


const NewRide = async() => {
  const bicycle = await fetchAllBicycle();

    return (
      <div className={styles.container}>
        <form action={addRides} className={styles.form}>
          <label className={styles.label} htmlFor="name">Ride Name</label>
          <input className={styles.input} placeholder="Ride around Glasgow" id="ridename" name="ridename" type="text" required/>
          <label className={styles.label} htmlFor="bicycle">Bicycle</label>
          <select className={styles.input} id="ridebicycle" name="ridebicycle" required>
          {bicycle.map((bicycle) => (
            <option value={bicycle.bicyclename} key={bicycle.id}>
              {bicycle.bicyclename}
            </option>
          ))}        
        </select>
          <label className={styles.label} htmlFor="distance">Ride Distance(km)</label>
          <input className={styles.input} placeholder="10" id="ridedistance" name="ridedistance" type="number" required/>
          <label className={styles.label} htmlFor="date">Date</label>
          <input className={styles.input} id="ridedate" name="ridedate" type="date" required/>
          <label className={styles.label} htmlFor="time">Ride Time (hours : minutes)</label>
          <input className={styles.input} id="ridetime" name="ridetime" type="time" required />
          <label className={styles.label} htmlFor="speed">Ride Speed (km/h)</label>
          <input className={styles.input} placeholder="10" id="ridespeed" name="ridespeed" type="number" required/>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.input} id="ridedescription" name="ridedescription" rows="6"> </textarea>
          <button className={styles.submitButton}>Submit</button>
        </form>
      </div>
      
    )
  } 
  
export default NewRide 