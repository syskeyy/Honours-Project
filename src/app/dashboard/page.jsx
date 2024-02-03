import Drivetrain from '../ui/dashboard/card/drivetrain' 
import Brakes from '../ui/dashboard/card/brakes'
import Tyres from '../ui/dashboard/card/tyres' 
import Bike from '../ui/dashboard/card/bike'

import Chart from '../ui/dashboard/chart/chart'
import Rides from '../ui/dashboard/rides/rides'
import styles from '../ui/dashboard/dashboard.module.css'  
import { fetchMostRecentRideDrivetrainHealth } from '../lib/data.js'
import DashboardSearch from '../ui/dashboard/dashboardSearch/dashboardSearch'

const Dashboard = async() => {

   const drivetrainhealth = await fetchMostRecentRideDrivetrainHealth();

   
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <DashboardSearch/>
          <div className={styles.cards}>
            <Drivetrain 
            drivetrainhealth={drivetrainhealth} 
            
            />
            <Brakes/>
            <Tyres/>
            <Bike/>
          </div>
          <Chart/>
          <Rides/>
        </div>
      </div>
    )
  }
  
export default Dashboard