import styles from "./rides.module.css"
import { fetchRidesDashboard } from "../../../lib/data"


// This is the rides component that gets displayed in the dashboard, it fetches the rides from the database and returns 4 entries and displays it in a table.
const Rides = async() => {

  const {count, rides} = await fetchRidesDashboard();

  console.log(rides)

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
      </div>
      <div className={styles.top}>
        <span>Recent Rides</span>
      </div>
      <table className={styles.table}>
      <thead>
        <tr>
          <td className="tableName">Name</td>
          <td className="tableType">Ride Distance</td>
          <td className="tableMileage">Ride Speed</td>
          <td className="tableMileage">Ride Date</td>
        </tr>
      </thead>
      <tbody>
      {rides.map((ride)=>(
       <tr key={ride.id}>  
        <td>{ride.ridename}</td>
        <td>{ride.ridedistance}</td>
        <td>{ride.ridespeed}</td>
        <td>{ride.ridedate.toString().slice(4, 16)}</td>
       </tr>
      ))}
      </tbody>
      </table>
    </div>
  )
}

export default Rides