import React from 'react'
import style from './StoreList.module.css'
import { Link } from 'react-router-dom'

// const data = [
//   {
//     location: 'Manchester UK',
//     employees: '23 employees',
//     items: '308 items',
//     revenue: '$600000',
//   },
//   {
//     location: 'London UK',
//     employees: '15 employees',
//     items: '210 items',
//     revenue: '$450000',
//   },
//   {
//     location: 'Birmingham UK',
//     employees: '18 employees',
//     items: '150 items',
//     revenue: '$300000',
//   },
//   {
//     location: 'Leeds UK',
//     employees: '20 employees',
//     items: '270 items',
//     revenue: '$550000',
//   },
//   {
//     location: 'Liverpool UK',
//     employees: '25 employees',
//     items: '320 items',
//     revenue: '$650000',
//   },
//   {
//     location: 'Glasgow UK',
//     employees: '22 employees',
//     items: '290 items',
//     revenue: '$620000',
//   },
// ]
function StoreList({ data }) {
  const limitedData = data.slice(0, 4)
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>Store List</h3>
        <Link>
          <p>View All</p>
        </Link>
      </div>
      <table>
        <tbody className={style.headlessTable}>
          {limitedData.map((row, index) => (
            <tr key={index}>
              <td>{row.location}</td>
              <td>{row.noOfStaff} employees</td>
              <td>{row.items}</td>
              <td>{row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StoreList
