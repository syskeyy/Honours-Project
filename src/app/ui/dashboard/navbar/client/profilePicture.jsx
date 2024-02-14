"use client"
import styles from '../navbar.module.css';
import {useSession} from 'next-auth/react';

// Client component that displays the profile picture of the user, used in the navbar
export default function ProfilePicture()  {

    const {data: session} = useSession();

    return (
        <img className={styles.ProfileIconImage} src={session?.user?.image || "/landscape-placeholder.svg"} alt="profile icon"/>   
        )
  }
  