
import Link from "next/link";
import styles from "../../ui/dashboard/profile/profile.module.css";
import {options} from "../../../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Profile(){
  const session = await getServerSession(options);

  return (
    session ? (
      <>
        <div className={styles.container}>
          <div className={styles.top}>
            <img className={styles.ProfileIconImage} src="/landscape-placeholder.svg" alt="profile icon"/>   
          </div>
          <form className={styles.form}>
            <label className={styles.label} htmlFor="name">Username</label>
            <input readOnly className={styles.input} name="username" type="text"/>
            <label className={styles.label} htmlFor="email">Email</label>
            <input readOnly className={styles.input} name="email" type="text"/>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input readOnly className={styles.input} id="firstName" name="firstName" type="text"/>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input readOnly className={styles.input} id="lastName" name="lastName" type="text"/>
            <label className={styles.label} htmlFor="city">City</label>
            <input readOnly className={styles.input} id="city" name="city" type="text"/>
            <label className={styles.label} htmlFor="state">State</label>
            <input readOnly className={styles.input} id="state" name="state" type="text"/>
            <label className={styles.label} htmlFor="country">Country</label>
            <input readOnly className={styles.input} id="country" name="country" type="text"/>
          </form>
        </div>
      </>
    ) : (
      <Link href="/api/auth/signin">
        <a>Sign in</a>
      </Link>
    )
  );
}

