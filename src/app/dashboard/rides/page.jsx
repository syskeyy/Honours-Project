import styles from "./rides.module.css"
import Pages from "../../ui/dashboard/pagenumbers/pages"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import { fetchRides } from "../../lib/data.js"

  //This is a table page that displays the users rides. It will fetch all the rides users are associated with using their session email, when user clicks on 'view' button it will open the ride id page
  //Unlike the bicycle page, this page will have an actual way of going to the next page and previous page as rides will be numerous. The pages component can be seen at the top of the import.

const RidesPage = async({searchParams}) => {

  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const {count, rides} = await fetchRides(q, page);


  console.log(rides)

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
      </div>
      <div className={styles.top}>
        <Search placeholder="Search for a ride"/>
        <Link href="/dashboard/rides/add">
          <button className={styles.addBicycleButton}>Add new ride</button>
        </Link>
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
        {/* Shortened the date format down */}
        <td>{ride.ridedate.toString().slice(4, 16)}</td>
        <td>
            <Link href={`/dashboard/rides/${ride.id}`}>
              <button className={styles.viewButton}>View</button>
            </Link>
          </td>
       </tr>
      ))}
      </tbody>
      </table>
      <Pages count={count}/>
    </div>
  )
}

export default RidesPage