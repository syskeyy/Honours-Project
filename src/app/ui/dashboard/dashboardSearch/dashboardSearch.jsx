import styles from '../../dashboard/dashboardSearch/dashboardSearch.module.css'
import { fetchAllBicycle } from '../../../lib/data.js'


const dashboardSearch = async() => {

  const bicycle = await fetchAllBicycle();

    return (
        <div className={styles.searchBicycles}>
            <label className={styles.bicycleLabel} htmlFor="Select Bicycle">Select Bicycle</label>
            <select className={styles.input} id="bicycle" name="bicycle">
              {bicycle.map((bicycle) => (
              <option value={bicycle.id} key={bicycle.id}>
              {bicycle.bicyclename}
              </option>
              ))}
            </select>
          </div>
    )
  }
  
export default dashboardSearch