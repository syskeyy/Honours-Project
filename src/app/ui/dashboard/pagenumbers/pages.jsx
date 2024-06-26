"use client"

import styles from "./pages.module.css"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

// Component that displays the page numbers and allows the user to navigate through the pages. This is referenced quite heavily from the next.JS dashboard tutorial: https://youtu.be/cBg6xA5C60s 
const Pages = ({count}) => {

  const searchParams = useSearchParams()
  const pathname = usePathname();
  const {replace} = useRouter();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams)  
  const ITEM_PER_PAGE = 10;

  const hasPrevPage = ITEM_PER_PAGE * (parseInt(page)-1) > 0;
  const hasNextPage = ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE < count;

  const changePage = (type)=> {
    type === "back" ? params.set("page", parseInt(page)-1) : params.set("page", parseInt(page)+1);
    replace(`${pathname}?${params}`)
  }

    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={()=> changePage("back")} disabled={!hasPrevPage}>Back</button>
        <button className={styles.button} onClick={()=> changePage("next")}disabled={!hasNextPage}>Next</button>
      </div>
    )
  }
  
export default Pages