"use client"
import styles from '../navbar.module.css';
import {useSession} from 'next-auth/react';


export default function ProfilePicture()  {

    const {data: session} = useSession();

    return (
        <img className={styles.ProfileIconImage} src={session?.user?.image || "/landscape-placeholder.svg"} alt="profile icon"/>   
        )
  }
  