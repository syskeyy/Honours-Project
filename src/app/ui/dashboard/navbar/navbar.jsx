import styles from './navbar.module.css';
import Link from 'next/link';
import PathName from "./client/pathname"
import ProfilePicture from './client/profilePicture';
import Achievement from '../achievements/achievementNavbar';
import {
    MdOutlineNotificationsNone,
    MdStarOutline,
    MdSearch,
} from "react-icons/md";


const Navbar = () => {

    return (
        <div className={styles.container}>
            <PathName/>
            <div className={styles.input}>
            </div>
            <div className={styles.menu}>
                <div className={styles.notification}>
                    <Link href="/dashboard/achievements">
                         <MdStarOutline className={styles.starIcon} size={30}/>
                    </Link>
                    <Achievement/>
                    <MdOutlineNotificationsNone size={30}/>
                </div>
                <div className={styles.ProfileIcon}>
                    <Link href="/dashboard/profile">
                        <ProfilePicture/>
                    </Link>
                    <span className={styles.profileTitle}>Profile</span>
                </div>
            </div>
         </div>
        )
  }
  
export default Navbar