import React from 'react'
import style from './storeComponentStyle.module.css'


const StoreList = ({onSelectStore}) => {
    const data = [
        {
          location: 'Manchester UK',
          employees: '23 employees',
          items: '308 items',
          revenue: '$600000',
        },
        {
          location: 'London UK',
          employees: '15 employees',
          items: '210 items',
          revenue: '$450000',
        },
        {
          location: 'Birmingham UK',
          employees: '18 employees',
          items: '150 items',
          revenue: '$300000',
        },
        {
          location: 'Leeds UK',
          employees: '20 employees',
          items: '270 items',
          revenue: '$550000',
        },
        {
          location: 'Liverpool UK',
          employees: '25 employees',
          items: '320 items',
          revenue: '$650000',
        },
        {
          location: 'Glasgow UK',
          employees: '22 employees',
          items: '290 items',
          revenue: '$620000',
        },
      ]

  return (
    <div className='flex flex-wrap gap-5 mt-5'>
      {data.map((store, idx) =>{
        return (
            <div key={idx} className={style.store} onClick={()=>onSelectStore(store)}>
                {store.location}
            </div>
        )
      })}
    </div>
  )
}

export default StoreList
