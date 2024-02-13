import React, {useState} from "react";
import styles from "./card.module.css"

export const Tooltip = ({text, children}) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div 
        className={styles.tooltipContainer}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && <div className="tooltip">{text}</div>}
        </div>
    )
}