import styles from "./rides.module.css"

const Rides = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Rides</h2>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableTitle}>
                        <td>Name</td>
                        <td>Distance</td>
                        <td>Speed</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aberdeen</td>
                        <td>10km</td>
                        <td>20km/h</td>
                        <td>01/01/2021</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Aberdeen</td>
                        <td>10km</td>
                        <td>20km/h</td>
                        <td>01/01/2021</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Aberdeen</td>
                        <td>10km</td>
                        <td>20km/h</td>
                        <td>01/01/2021</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Rides