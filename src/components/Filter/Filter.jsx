import React from 'react'
import style from './filterStyle.module.css'
import RedirectButton from '../Button/RedirectButton'
import { useGetLocationsQuery } from '../../redux/APIs/storeApi'
import { Download, PlusIcon } from 'lucide-react'

const Filter = ({
  handleFilter,
  handleSearch,
  direction,
  title,
  button,
  location,
  search,
  display,
  text,
  print
}) => {
  // const Filter = ({
  //   handleFilter,
  //   handleSearch,
  //   direction,
  //   title,
  //   button,
  //   location,
  // }) => {

  // Fetch locations data using RTK query
  const { data: locations, error, isLoading } = useGetLocationsQuery()

  return (
    <div className={`flex justify-between items-center px-4 ${style.body}`}>
      <div className={style.left}>
        <h2>{title}</h2>
      </div>
      <div className={`flex ${style.right}`}>
        <input
          type="text"
          placeholder={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Select Filter */}
        {/* <span className={display}>
          {isLoading ? (
            <select name="" id="" className={display}>
              <option value="">Loading locations...</option>
            </select>
          ) : error ? (
            <select name="" id="">
              <option value="">Failed to load locations</option>
            </select>
          ) : (
            <div>
              <select onChange={(e) => handleFilter(e.target.value)}>
                <option value="all">Filter by location</option>
                {locations.map((location, idx) => (
                  <option value={location} key={idx}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          )}
        </span> */}
        <button onClick={print} className='text-[#8315DB] border-2 border-[#8315DB] w-52 py-2 rounded-md flex justify-center items-center gap-2'><Download/> Generate Invoice</button>

        <RedirectButton buttonName={button} text={text} direction={direction} />
      </div>
    </div>
  )
}

export default Filter
