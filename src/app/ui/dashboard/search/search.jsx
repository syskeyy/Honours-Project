"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import styles from "./search.module.css"
import { MdSearch } from "react-icons/md"
import { useDebouncedCallback } from 'use-debounce'

const Search = ({placeholder}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const {replace} = useRouter();

  {/* Using debounce to improve performance in search */}
  const onSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams)  

    params.set("page,", 1);
    
    if(e.target.value) {
      params.set('q', e.target.value)
    }
    else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  },500);


  console.log(pathname)
  console.log(searchParams)

    return (
      <div className={styles.container}>
        <MdSearch/>
        <input type="text" placeholder={placeholder} className={styles.input} onChange={onSearch} />
      </div>
    )
  }
  
export default Search