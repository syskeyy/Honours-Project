import Link from "next/link";
import styles from "../../ui/dashboard/achievements/achievement.module.css";
import { FaCheck } from 'react-icons/fa'; // Import the tick icon
import React from "react";


export default function Profile() {
  const currentXp = 1050;
  const xpPerLevel = 100;
  const getCurrentLevel = Math.floor(currentXp/100);

  const level = Math.floor(currentXp / xpPerLevel);
  const finalXp = currentXp % xpPerLevel;
  
  return (
<div className={styles.container}>
  <div className={styles.top}>
      <div>
        <label className={styles.experience} htmlFor="name">Experience</label>
      </div>
      <div className={styles.containerBar}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressValue} 
            style={{ width: `${finalXp}%` }}
          >
            {currentXp} XP
          </div>
        </div>
        <div className={styles.levelContainer}>
          <div className={styles.levelLabelLeft}>
          <label className={styles.levelLabel} htmlFor="name">Level: {getCurrentLevel}</label>
          </div>
          <div className={styles.levelLabelRight}>
          <label className={styles.levelLabel} htmlFor="name">Level: {getCurrentLevel+1}</label>
          </div>
        </div>
      </div>
    </div>
  <div className={styles.bottom}>
    <div className={styles.containerLevel}>
      <div className={styles.circleLevel}>
        <div className={styles.circleLevelDetail}>
         {getCurrentLevel >= 5 ? <FaCheck style={{ color: 'var(--green)' }}/> : 5}     
         </div>
      </div>
      <div className={styles.barLevel}>
        <div className={styles.barLevelTextLeft}>
          Level 5
        </div>
        <div className={styles.barLevelTextRight}>
          XP Needed: 500
        </div>
      </div>
    </div>
  </div>
  <div className={styles.bottom}>
    <div className={styles.containerLevel}>
      <div className={styles.circleLevel}>
        <div className={styles.circleLevelDetail}>
         {getCurrentLevel >= 10 ? <FaCheck style={{ color: 'var(--green)' }}/> : 10}     
         </div>
      </div>
      <div className={styles.barLevel}>
        <div className={styles.barLevelTextLeft}>
          Level 10
        </div>
        <div className={styles.barLevelTextRight}>
          XP Needed: 1000
        </div>
      </div>
    </div>
  </div>
  <div className={styles.bottom}>
    <div className={styles.containerLevel}>
      <div className={styles.circleLevel}>
        <div className={styles.circleLevelDetail}>
         {getCurrentLevel >= 15 ? <FaCheck style={{ color: 'var(--green)' }}/> : 15}     
         </div>
      </div>
      <div className={styles.barLevel}>
        <div className={styles.barLevelTextLeft}>
          Level 15
        </div>
        <div className={styles.barLevelTextRight}>
          XP Needed: 1500
        </div>
      </div>
    </div>
  </div>
  <div className={styles.bottom}>
    <div className={styles.containerLevel}>
      <div className={styles.circleLevel}>
        <div className={styles.circleLevelDetail}>
         {getCurrentLevel >= 20 ? <FaCheck style={{ color: 'var(--green)' }}/> : 20}     
         </div>
      </div>
      <div className={styles.barLevel}>
        <div className={styles.barLevelTextLeft}>
          Level 20
        </div>
        <div className={styles.barLevelTextRight}>
          XP Needed: 2000
        </div>
      </div>
    </div>
  </div>
  <div className={styles.bottom}>
    <div className={styles.containerLevel}>
      <div className={styles.circleLevel}>
        <div className={styles.circleLevelDetail}>
         {getCurrentLevel >= 25 ? <FaCheck style={{ color: 'var(--green)' }}/> : 25}     
         </div>
      </div>
      <div className={styles.barLevel}>
        <div className={styles.barLevelTextLeft}>
          Level 25
        </div>
        <div className={styles.barLevelTextRight}>
          XP Needed: 2500
        </div>
      </div>
    </div>
  </div>
</div>
  )
}