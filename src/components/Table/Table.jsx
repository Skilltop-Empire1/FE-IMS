import React from 'react'
import style from './tableStyle.module.css'
import BUtton from '../Button/Button'
import { useGetProductsQuery } from '../../redux/APIs/productApi'

const Table = ({ status, date }) => {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading products</p>

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
          {products.map((product, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <img src={product.prodPhoto} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>
                  <BUtton buttonName={product.alertStatus} />
                </td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>{product.storeAvailable}</td>
                <td>{product.createdAt}</td>
                <td>delete/edit</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
