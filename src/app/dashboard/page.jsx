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

const Dashboard = async(onReset) => {
  const bicycles = await fetchAllBicycle();
  const bike = bicycles[0];

  if (bike) {
    const drivetrainhealth = await fetchDrivetrainHealth();
    const bikehealth = await fetchBikeHealth();
    const tyrehealth = await fetchTyreHealth();
    const brakehealth = await fetchBrakeHealth();

    return (
      <div className={styles.wrapper}>
        <ToastContainer
        position='top-center'/>
        <div className={styles.main}>
          <DashboardSearch/>
          <div className={styles.cards}>
            <Drivetrain drivetrainhealth={drivetrainhealth} onReset={onReset} />
            <Brakes brakehealth={brakehealth} onReset={onReset} />
            <Tyres tyrehealth={tyrehealth} onReset={onReset} />
            <Bike bikehealth={bikehealth} onReset={onReset}/>
          </div>
          <Chart/>
        </div>
      </div>
    )
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