import { fetchBicycle } from "../../../lib/data";
import styles from "../../../ui/dashboard/bicycles/viewBicycle/viewBicycle.module.css"
import { updateBicycle } from "../../../lib/actions.js";
import { deleteBicycle } from "../../../lib/actions.js";

const ViewBicyclePage = async ({ params }) => {


  //This is the 'view' bicycle page, this page is loaded when user clicks on view and opens the id of the bicycle
  const { id } = params;
  // Fetches bicycle using id
  const bicycle = await fetchBicycle(id);
  console.log(bicycle)

  // This is just the form to display the bicycle details. This form has an action of 'deleteBicycle' which can be seen in the actions.js file.
    return (
        <div className={styles.container}>
        <form action={deleteBicycle} className={styles.form}>
          <input type="hidden" name="id" value={bicycle.id} />
          <label className={styles.label} htmlFor="name">Bicycle Name</label>
          <input className={styles.input} id="name" name="name" value={bicycle.bicyclename} type="text"/>
          <label className={styles.label} htmlFor="type">Bicycle Type</label>
          <select className={styles.input} id="type" value={bicycle.bicycletype} name="type">
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
          <input className={styles.input} id="year" name="year" value={bicycle.bicycleyear} type="number"/>
          <label className={styles.label} htmlFor="mileage">Bicycle Mileage</label>
          <input className={styles.input} id="mileage" name="mileage" value={bicycle.bicyclemileage} type="number"/>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.input} id="description" name="description" value={bicycle.bicycledescription} rows="6"> </textarea>
          <button className={styles.deleteButton}>Delete</button>
        </form>
      </div>
    )
  }
  
export default ViewBicyclePage