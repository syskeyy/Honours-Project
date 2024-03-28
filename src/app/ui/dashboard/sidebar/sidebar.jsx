"use client"
import styles from "./sidebar.module.css"
import Menu from "./menu/menu"
import Link from 'next/link';
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

// Icons for the menu items
import {
    MdPedalBike,
    MdStarOutline,
    MdRoute,
    MdSpaceDashboard,
    MdSettings,
    MdPerson,
    MdOutlineLogin,

} from "react-icons/md";

// Menu items, icons, and paths
const menuItems = [
    {   
        list: [
            {title: "Dashboard", 
            path: "/dashboard",
            icon: <MdSpaceDashboard />
            },
            {title: "Bicycles",
            path: "/dashboard/bicycles",
            icon: <MdPedalBike />
            },
            {title: "Rides",
            path: "/dashboard/rides",
            icon:  <MdRoute />
            },
            {title: "Achievements",
            path: "/dashboard/achievements",
            icon: <MdStarOutline />
            },

            {title: "Profile",
            path: "/dashboard/profile",
            icon: <MdPerson />
            },

            {title: "Settings",
            path: "/dashboard/settings",
            icon: <MdSettings />
            },
        ]
    },
]

// Menu top that shows logo, and website name
const Sidebar = () => {
    return (
        <div className={styles.container}>
        <div className={styles.logo}>
            <Link href="/dashboard">
                 <img className={styles.logoIcon} src="/logo.png" alt="profile icon"/>
            </Link>  
            <div className={styles.logoDetail}>
                <span className={styles.logoTitle}>ChainSafe</span>
                <span className={styles.logoSubtitle}>Bicycle Maintence Tracker</span>

            </div>
        </div>
        {/* Menu item list */}
        <ul className={styles.list}>
                {menuItems.map((items) => (
                    <li key={items.title}>
                    <span className={styles.items}>{items.title}</span>
                    {items.list.map((item) => (
                        <Menu item={item} key={item.title} />  
                    ))}
                    </li>
                ))}
            </ul>
            <button className={styles.signout} onClick={() => signOut('google')}>
                <MdOutlineLogin/>
                        <h4>Sign out</h4>
            </button>
        </div>
    );
  };
  
export default Sidebar