"use client"
import styles from '../navbar.module.css';
import {usePathname} from 'next/navigation';


export default function PathName()  {

    const Pathname = usePathname();
    const showSelectInput = Pathname === '/dashboard'; 

    return (
            <div className={styles.title}>{Pathname.split("/").pop()}</div>
        )
  }
  