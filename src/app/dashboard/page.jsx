import Drivetrain from '../ui/dashboard/card/drivetrain' 
import Brakes from '../ui/dashboard/card/brakes'
import Tyres from '../ui/dashboard/card/tyres' 
import Bike from '../ui/dashboard/card/bike'

import Chart from '../ui/dashboard/chart/chart'
import Rides from '../ui/dashboard/rides/rides'
import Footer from '../ui/dashboard/footer/footer'
import styles from '../ui/dashboard/dashboard.module.css'  



const Dashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            <Drivetrain/>
            <Brakes/>
            <Tyres/>
            <Bike/>
          </div>
          <Chart/>
          <Rides/>
          <Footer/>
        </div>
      </div>
    )
  }
  
export default Dashboard