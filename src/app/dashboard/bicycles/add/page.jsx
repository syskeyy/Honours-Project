import styles from "../../../ui/dashboard/bicycles/newBicycle/newBicycle.module.css"
import { addBicycles } from "../../../lib/actions.js"

//This is a table page that displays a blank form for users to fill. Upon the user submit button it activates the form action to upload the new bicycle data to the database.
const NewBicycle = () => {
    return (
      <div className={styles.container}>
        <form action={addBicycles} className={styles.form}>
          <label className={styles.label} htmlFor="name">Bicycle Name</label>
          <input className={styles.input} id="bicyclename" name="bicyclename" type="text"/>
          <label className={styles.label} htmlFor="type">Bicycle Type</label>
          <select className={styles.input} id="bicycletype"  type="text" name="bicycletype">
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
          <input className={styles.input} id="bicycleyear" name="bicycleyear" type="number"/>
          <label className={styles.label} htmlFor="mileage">Bicycle Mileage</label>
          <input className={styles.input} id="bicyclemileage" name="bicyclemileage" type="number"/>
          <label className={styles.label} htmlFor="description">Description</label>
          <textarea className={styles.input} id="bicycledescription" name="bicycledescription" type="text" rows="6"> </textarea>
          <button className={styles.submitButton}>Submit</button>
        </form>
      </div>
      
    )
  } 
  
export default NewBicycle 