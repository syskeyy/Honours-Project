"use client"
import styles from "../ui/dashboard/login/login.module.css"
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logins}>
        <form action="" className={styles.form}>
          <span className={styles.loginTitle}>Login</span>
          <label className={styles.label} htmlFor="username">Username</label>
          <input type="username" className="Username" />
          <label className={styles.label} htmlFor="password">Password</label>
          <input type="password" className="Password" />
          <button className={styles.googleSignInButton} onClick={() => signIn('google')}>
            <img src="/Google.svg" width="40" height="40" alt="Google Sign-In" />
            Sign in with Google
          </button>
        </form>
      </div>
      <div className={styles.poster}>
        <Image layout="fill"
        objectFit="cover"
        src="/backgroundPoster.jpg"
        alt="Picture of the author"
        />
      </div>
    </div>
  )
}

export default Login