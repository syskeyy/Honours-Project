
import Link from "next/link";
import styles from "../../ui/dashboard/profile/profile.module.css";
import { getServerSession } from "next-auth/next";

export default async function Profile(){
  const session = await getServerSession();

  return (
    session ? (
      <>
        <div className={styles.container}>
          <div className={styles.top}>
            <img className={styles.ProfileIconImage} src={session?.user?.image || "/landscape-placeholder.svg"}  alt="profile icon"/>   
          </div>
          <form className={styles.form}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input readOnly className={styles.input} value={session.user.name} name="username" type="text"/>
            <label className={styles.label} htmlFor="email">Email</label>
            <input readOnly className={styles.input} name="email" value={session.user.email}type="text"/>

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

