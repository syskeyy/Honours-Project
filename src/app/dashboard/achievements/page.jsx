import Link from "next/link";
import styles from "../../ui/dashboard/achievements/achievement.module.css";
import { FaCheck } from 'react-icons/fa'; 
import React from "react";
import {fetchExperiance} from "../../lib/data.js";

const Achievement = async ({  }) => {
  //Fetches the current experiance of user
  const currentXp = await fetchExperiance();
  //This bit simply calculates the current level of the user
  const xpPerLevel = 100;
  const getCurrentLevel = Math.floor(currentXp/xpPerLevel);
  const finalXp = currentXp % xpPerLevel;
  
  //This bit returns the the JSX for the achievement page and checks to see current level, if current level is achieved then check mark will activate
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

export default Achievement