"use client"
import styles from './navbar.module.css';
import {usePathname} from 'next/navigation';
import {
    MdOutlineNotificationsNone,
    MdStarOutline,
    MdSearch,
} from "react-icons/md";


const Navbar = () => {

    const Pathname = usePathname();
    const showSelectInput = Pathname === '/dashboard'; 

    return (
        <div className={styles.container}>
            <div className={styles.title}>{Pathname.split("/").pop()}</div>
            <div className={styles.input}>
            {showSelectInput && (
                <div className={styles.input}>
                    <select className={styles.searchInput} type="text" placeholder="Select Bicycle"/>
                </div>
            )}
            </div>
            <div className={styles.menu}>
                <div className={styles.notification}>
                    <MdStarOutline size={30}/>
                    <span className={styles.pointsTitle}>321</span>
                    <MdOutlineNotificationsNone size={30}/>
                </div>
                <div className={styles.ProfileIcon}>
                    <img className={styles.ProfileIconImage} src="/landscape-placeholder.svg" alt="profile icon"/>                
                </div>
            </div>
         </div>
        )
  }
  
export default Navbar