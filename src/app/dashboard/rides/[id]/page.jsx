import { fetchRide } from "../../../lib/data";

import styles from "../../../ui/dashboard/rides/viewRides/viewRides.module.css"
import { deleteRide } from "../../../lib/actions.js";

const ViewRidePage = async({params}) => {

  const { id } = params;

  const ride = await fetchRide(id);
  console.log(ride)
    return (
        <div className={styles.container}>
          <form action={deleteRide} className={styles.form}>
          <input type="hidden" name="id" value={ride.id} />
          <label className={styles.label} htmlFor="name">Ride Name</label>
          <input className={styles.input} id="name" name="name" value={ride.ridename} type="text"/>
          <label className={styles.label} htmlFor="bicycle">Bicycle</label>
          <input className={styles.input} id="name" name="name" value={ride.ridebicycle} type="text"/>
          <label className={styles.label} htmlFor="distance">Ride Distance</label>
          <input className={styles.input} id="name" name="name" value={ride.ridedistance} type="text"/>
          <label className={styles.label} htmlFor="speed">Ride Speed</label>
          <input className={styles.input} id="name" name="name" value={ride.ridespeed} type="text"/>
          <label className={styles.label} htmlFor="date">Date</label>
          <input className={styles.input} id="name" name="name" value={ride.ridedate} type="text"/>
          <label className={styles.label} htmlFor="time">Time</label>
          <input className={styles.input} id="name" name="name" value={ride.ridetime} type="text"/>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.input} id="description" rows="6" value={ride.ridedescription}> </textarea>
          <button className={styles.deleteButton}>Delete</button>
        </form>
      </div>
    )
  }
  
export default ViewRidePage