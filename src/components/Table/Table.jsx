import React from 'react'
import style from './tableStyle.module.css'
import BUtton from '../Button/Button'
import { Trash, Edit2Icon } from 'lucide-react'

const Table = ({ status, date, api, prod, deleted, updated }) => {
  return (
    <div className="pt-3">
      <table className={style.table}>
        <thead>
          <tr className={style.tr}>
            {/* <th> </th> */}
            <th>Product Photo</th>
            <th>Product Name</th>
            <th>{status}</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Category</th>
            <th>Store Name</th>
            <th>{date}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={prod}>
          {api.map((product, idx) => (
            <tr key={idx}>
              {/* <td>
                <input type="checkbox" />
              </td> */}
              <td>
                <img src={product.prodPhoto} alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>
                <BUtton
                  buttonName={
                    product.quantity > product.alertStatus
                      ? 'Active'
                      : product.quantity === 0
                        ? 'Empty'
                        : 'Low'
                  }
                  className="me-5"
                />
              </td>
              <td>{product.quantity}</td>
              <td>₦ {product.price}</td>
              <td>{product.Category.name}</td>
              <td>
                {product.storeAvailable.length > 8
                  ? product.storeAvailable.substr(0,10) + '...'
                  : product.storeAvailable}
              </td>
              <td>{product.createdAt.substr(0, 10)}</td>
              <td className="flex gap-1">
                <Edit2Icon
                  className={style.icon}
                  onClick={() => updated(product)}
                />
                <Trash
                  className={style.icon}
                  onClick={() => deleted(product.prodId)} // Pass the product ID to the delete function
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
