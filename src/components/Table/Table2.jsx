import React from 'react'
import style from './tableStyle.module.css'
import BUtton from '../Button/Button'
import { useGetProductsQuery } from '../../redux/APIs/productApi'
import { Trash, Edit2Icon } from 'lucide-react'

const Table2 = ({status, date, api,}) => {

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Error loading products</p>

  return (
    <div className="pt-3">
      <table className={style.table}>
        <thead>
          <tr className={style.tr}>
            <th> </th>
            <th>Product Photo</th>
            <th>Product Name</th>
            <th>{status}</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Store Name</th>
            <th>{date}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            api.map((product, idx) => {
              return (
                <tr key={idx}>
                <td><input type="checkbox" /></td>
                <td><img src={product.prodPhoto} alt={product.name} /></td>
                <td>{`${product.Product.name}`} </td>
                <td >
                  {product.paymentMethod}
                </td>
                <td>{product.quantity}</td>
                <td>{product.categoryId}</td>
                <td>{product.Store.storeName.length > 8 ? product.Store.storeName.substr(0,8) + '...' : product.Store.storeName}</td>
                <td>{product.createdAt.substr(0,10)}</td>
                <td className='flex gap-1'><Edit2Icon className={style.icon}/><Trash className={style.icon}/></td>
              </tr>
            )
          })}
        </tbody>
        

      </table>
    </div>
  )  
}

export default Table2
