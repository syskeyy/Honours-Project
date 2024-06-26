import styles from "../ui/dashboard/login/login.module.css"
import Image from 'next/image'
import LoginButton from "../ui/dashboard/login/loginButton"

export default async function Login(){

 return (
    <div className={styles.container}>
      <div className={styles.logins}>
        <form action="" className={styles.form}>
          <span className={styles.loginTitle}>Login</span>
          <label className={styles.label} htmlFor="username">Username</label>
          <input type="username" className="Username" />
          <label className={styles.label} htmlFor="password">Password</label>
          <input type="password" className="Password" />
          <LoginButton/>
        </form>
      </div>
      <div className={styles.poster}>
        <Image layout="fill"
        loading="eager" 
        src="/backgroundPoster.jpg"
        alt="Picture of the author"
        />
      </div>
    </div>
  )
}
