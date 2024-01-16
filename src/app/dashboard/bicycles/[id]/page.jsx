import { fetchBicycle } from "../../../lib/data";
import styles from "../../../ui/dashboard/bicycles/viewBicycle/viewBicycle.module.css"
import { updateBicycle } from "../../../lib/actions.js";
import { deleteBicycle } from "../../../lib/actions.js";

const ViewBicyclePage = async ({ params }) => {

  const { id } = params;

  const bicycle = await fetchBicycle(id);
  console.log(bicycle)

    return (
        <div className={styles.container}>
        <form action={deleteBicycle} className={styles.form}>
          <input type="hidden" name="id" value={bicycle.id} />
          <label className={styles.label} htmlFor="name">Bicycle Name</label>
          <input className={styles.input} id="name" name="name" placeholder={bicycle.bicyclename} type="text"/>
          <label className={styles.label} htmlFor="type">Bicycle Type</label>
          <select className={styles.input} id="type" placeholder={bicycle.bicycletype} name="type">
            <option value="gravel">Gravel</option>
            <option value="road">Road</option>
            <option value="mountain">Mountain</option>
            <option value="hybrid">Hybrid</option>
            <option value="cyclocross">Cyclocross</option>
            <option value="bmx">BMX</option>
            <option value="folding">Folding</option>
            <option value="electric">Electric</option>
            <option value="other">Other</option>  
          </select>
          <label className={styles.label} htmlFor="year">Bicycle Year</label>
          <input className={styles.input} id="year" name="year" placeholder={bicycle.bicycleyear} type="number"/>
          <label className={styles.label} htmlFor="mileage">Bicycle Mileage</label>
          <input className={styles.input} id="mileage" name="mileage" placeholder={bicycle.bicyclemileage} type="number"/>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.input} id="description" name="description" placeholder={bicycle.bicycledescription} rows="6"> </textarea>
          <button className={styles.deleteButton}>Delete</button>
        </form>
      </div>
    )
  }
  
export default ViewBicyclePage