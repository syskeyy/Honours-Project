import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"

//Highest level layout component that wraps the entire dashboard
const Layout = ({children}) => {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
            <Sidebar/>
        </div>
        <div className={styles.content}>
            <Navbar/>
            {children}
        </div>
      </div>
      
    )
  } 
  
export default Layout