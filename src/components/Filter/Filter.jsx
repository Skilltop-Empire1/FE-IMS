import React from 'react'
import style from './filterStyle.module.css'
import RedirectButton from '../Button/RedirectButton'
import { useGetLocationsQuery } from '../../redux/APIs/storeApi'
import { Download, PlusIcon } from 'lucide-react'
import { useLocation } from 'react-router'

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
  const getLocation = useLocation()
  // console.log(getLocation.pathname)

  return (
    <div className={` ${style.body}`}>
      <div className='flex justify-between items-center px-4'>
        <div className={style.left}>
          <h2>{title}</h2>
        </div>
        <div className={`flex ${style.right}`}>
          

          {/* Select Filter */}
          <span className={display}>
            {isLoading ? (
              <select name="" id="" className='{display}'>
                <option value="">Loading locations...</option>
              </select>
            ) : error ? (
              <select name="" id="">
                <option value="">Failed to load locations</option>
              </select>
            ) : (
              <div>
                <select onChange={(e) => handleFilter(e.target.value)} className='text-[#8315DB] border-2 border-[#8315DB] w-56 py-3 rounded-md flex justify-center items-center gap-2'>
                  <option value="all">Filter by Payment Option</option>
                  <option value="full">Full Payment</option>
                  <option value="part_payment">Part Payment</option>
                  <option value="credit">Credit Sales</option>
                </select>
              </div>
            )}
          </span>
          <button onClick={print} className={`text-[#8315DB] border-2 border-[#8315DB] w-52 py-2 rounded-md flex justify-center items-center gap-2  ${getLocation.pathname !== '/app/salesRecords' ? 'hidden' : ''}`}><Download/> Generate Invoice</button>

          <RedirectButton buttonName={button} text={text} direction={direction} />
        </div>
      </div>
      <div className='flex justify-center mt-5'>
        <input
            type="text"
            placeholder={search}
            onChange={(e) => handleSearch(e.target.value)}
            className=''
          />
      </div>
    </div>
  )
}

export default Filter
