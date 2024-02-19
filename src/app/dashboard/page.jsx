import Drivetrain from '../ui/dashboard/card/drivetrain' 
import Brakes from '../ui/dashboard/card/brakes'
import Tyres from '../ui/dashboard/card/tyres' 
import Bike from '../ui/dashboard/card/bike'
import Chart from '../ui/dashboard/chart/chart'
import Rides from '../ui/dashboard/rides/rides'
import styles from '../ui/dashboard/dashboard.module.css'  
import { fetchAllBicycle } from '../lib/data.js'
import { fetchDrivetrainHealth, fetchBikeHealth, fetchTyreHealth, fetchBrakeHealth} from '../lib/data.js';
import NoBike from '../ui/dashboard/card/noBike/nobike' 
import DashboardSearch from '../ui/dashboard/dashboardSearch/dashboardSearch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchLifespan } from '../lib/data.js';

// This is the main dashboard page, many components are imported and displayed here including the main logic of the website which is the card components of 'drivetrain', 'brakes', 'tyres' and 'bike'.
// The chart and rides components are also displayed here. The dashboard search component is also displayed here which I will admit looks a little weird. The search component does not work as making it work will require alot of redesinging.

const Dashboard = async(onReset) => {
  const bicycles = await fetchAllBicycle();
  //Willreturn only the first bicycle in the array that the user is associated with
  const bike = bicycles[0];

  // Basic validation, upon a new user sign up it will display a blank component that instructs the user to add a bicycle
  if (bike) {
    // Perhaps redundant to fetch all the health and lifespan data here, but this is the way I have done it. I done it here because its a server side page.
    const drivetrainhealth = await fetchDrivetrainHealth();
    const bikehealth = await fetchBikeHealth();
    const tyrehealth = await fetchTyreHealth();
    const brakehealth = await fetchBrakeHealth();
    const lifespan = await fetchLifespan();
    
    const drivetrainLifespan = lifespan.drivetrainLifespan;
    const brakeLifespan = lifespan.brakeLifespan;
    const tyreLifespan = lifespan.tyreLifespan;
    const bikeLifespan = lifespan.bikeLifespan;

    // After fetching the data the data is then passed into the card components
    return (
      <div className={styles.wrapper}>
        <ToastContainer
        position='top-center'/>
        <div className={styles.main}>
          <DashboardSearch/>
          <div className={styles.cards}>
            <Drivetrain drivetrainhealth={drivetrainhealth} drivetrainLifespan={drivetrainLifespan} onReset={onReset} />
            <Brakes brakehealth={brakehealth} brakeLifespan={brakeLifespan} onReset={onReset} />
            <Tyres tyrehealth={tyrehealth} tyreLifespan={tyreLifespan} onReset={onReset} />
            <Bike bikehealth={bikehealth} bikeLifespan={bikeLifespan} onReset={onReset}/>
          </div>
          <div className={styles.userDetails}>
            <Chart/>
            <Rides/>
          </div>
        </div>
      </div>
    )
    // If the user does not have a bicycle, it will display a blank component that instructs the user to add a bicycle. This can be seen with no bicycles.
    } else {
      return(
        <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            <NoBike />
          </div>
        </div>
      </div>
      )
    }
}
  
export default Dashboard