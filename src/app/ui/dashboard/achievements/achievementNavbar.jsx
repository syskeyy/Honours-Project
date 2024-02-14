import Link from "next/link";
import React from "react";
import {fetchExperiance} from "../../../lib/data"

// Achievement component that displays the users level by fetching the users experience from the user collection and dividing it by 100 to get the level.
const Achievement = async ({  }) => {
  const currentXp = await fetchExperiance();
  const xpPerLevel = 100;
  const getCurrentLevel = Math.floor(currentXp/100);

  const level = Math.floor(currentXp / xpPerLevel);
  const finalXp = currentXp % xpPerLevel;
  
    return (
        <span>Level {level}</span>
    )
  }

export default Achievement