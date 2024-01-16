import Card from '../ui/dashboard/card/card'
import Chart from '../ui/dashboard/chart/chart'
import Rides from '../ui/dashboard/rides/rides'
import Footer from '../ui/dashboard/footer/footer'
import styles from '../ui/dashboard/dashboard.module.css'  



const Dashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          </div>
          <Chart/>
          <Rides/>
          <Footer/>
        </div>
      </div>
    )
  }
  
export default Dashboard