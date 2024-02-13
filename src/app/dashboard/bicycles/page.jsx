import styles from "../../ui/dashboard/bicycles/bicycles.module.css"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import { fetchBicycles } from "../../lib/data.js"

const BicyclePage = async({searchParams}) => {


  const q = searchParams?.q || '';
  const bicycle = await fetchBicycles(q);

    return (
      <div className={styles.container}>
        <div className={styles.banner}>
        </div>
        <div className={styles.top}>
          <Search placeholder="Search for a bicycle"/>
          <Link href="/dashboard/bicycles/add">
             <button className={`${styles.addBicycleButton} ${bicycle.length === 1 ? styles.display : 'none'}`}>Add new bicycle</button>
          </Link>
        </div>
        <table className={styles.table}>
        <thead>
          <tr>
            <td className="tableName">Name</td>
            <td className="tableType">Bicycle Type</td>
            <td className="tableMileage">Bicycle Mileage</td>
          </tr>
        </thead>
        <tbody>
          {bicycle.map((bicycle) => (
          <tr key={bicycle.id}>
            <td>{bicycle.bicyclename}</td>
            <td>{bicycle.bicycletype}</td>
            <td>{bicycle.bicyclemileage}</td>
            <td>
              <Link href={`/dashboard/bicycles/${bicycle.id}`}>
                <button className={styles.viewButton}>View</button>
              </Link>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
    )
  }
  
export default BicyclePage