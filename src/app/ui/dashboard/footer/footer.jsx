import styles from './footer.module.css';

const Footer = () => {
    return (
      <div className={styles.container}>
        <div className={styles.title}>ChainSafe</div>
            <span className={styles.paragraph}> This website is made by David Gulijev.</span>
      </div>
    )
  }
  
export default Footer