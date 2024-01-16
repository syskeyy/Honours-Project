import styles from "../ui/dashboard/login/login.module.css"
import Image from 'next/image'


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
          <button className={styles.loginButton}>Submit</button> 
          <span className={styles.signupTitle}>Don't have an account? <span className={styles.signupBold}>Sign up here</span></span>
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