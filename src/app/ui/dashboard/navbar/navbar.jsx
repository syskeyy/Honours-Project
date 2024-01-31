"use client"
import styles from './navbar.module.css';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import {usePathname} from 'next/navigation';
import {
    MdOutlineNotificationsNone,
    MdStarOutline,
    MdSearch,
} from "react-icons/md";


const Navbar = () => {

    const Pathname = usePathname();
    const showSelectInput = Pathname === '/dashboard'; 
    const {data: session} = useSession();

    return (
        <div className={styles.container}>
            <div className={styles.title}>{Pathname.split("/").pop()}</div>
            <div className={styles.input}>

            </div>
            <div className={styles.menu}>
                <div className={styles.notification}>
                    <MdStarOutline size={30}/>
                    <span className={styles.pointsTitle}>Level 1</span>
                    <MdOutlineNotificationsNone size={30}/>
                </div>
                <div className={styles.ProfileIcon}>
                    <Link href="/dashboard/profile">
                    <img className={styles.ProfileIconImage} src={session?.user?.image || "/landscape-placeholder.svg"} alt="profile icon"/>   
                    </Link>
                    <span className={styles.profileTitle}>Profile</span>
                </div>
            </div>
         </div>
        )
  }
  
export default Navbar