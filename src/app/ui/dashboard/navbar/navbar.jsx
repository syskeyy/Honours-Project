import styles from './navbar.module.css';
import Link from 'next/link';
import PathName from "./client/pathname"
import ProfilePicture from './client/profilePicture';
import Achievement from '../achievements/achievementNavbar';
import {
    MdStarOutline,
    MdSearch,
} from "react-icons/md";

// Navbar component that displays the current pathname, notifications, and profile picture, current user level. The notifications does not do anything as this part has not been set up yet.

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
                </div>
                <div className={styles.ProfileIcon}>
                    <Link href="/dashboard/profile">
                        <ProfilePicture/>
                    </Link>
                </div>
                <span className={styles.profileTitle}>Profile</span>
            </div>
         </div>
        )
  }
  
export default Navbar