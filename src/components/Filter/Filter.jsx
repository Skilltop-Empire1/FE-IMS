import React from 'react'
import style from './filterStyle.module.css'
import RedirectButton from '../Button/RedirectButton'
import { useGetLocationsQuery } from '../../redux/APIs/storeApi'

const Filter = ({
  handleFilter,
  handleSearch,
  direction,
  title,
  button,
  location,
  search,
  display
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

        <RedirectButton buttonName={button} direction={direction} />
      </div>
    </div>
  )
}

export default Filter
