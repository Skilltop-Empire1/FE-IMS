import React from 'react';
import style from './tableStyle.module.css';
import { Trash, Edit2Icon } from 'lucide-react';

const Table2 = ({ status, date, api, deleted, updated }) => {
  return (
    <div className="pt-3">
      <table className={style.table}>
        
        <thead>
          <tr className={style.tr}>

            <th>Product Photo</th>
            <th>Product Name</th>
            <th>{status}</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Store Name</th>
            <th>{date}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {api.map((product) => (
            <tr key={product.saleId}>

              <td><img src={product.Product.prodPhoto} alt={product.Product.name} /></td>
              <td>{product.Product.name}</td>
              <td>{product.paymentMethod}</td>
              <td>{product.quantity}</td>
              <td>₦ {product.productPrice * product.quantity}</td>
              <td>{product.Store.storeName.length > 8 ? product.Store.storeName.substr(0,12) + '...' : product.Store.storeName}</td>
              <td>{product.soldDate.substr(0,10)}</td>
              <td className='flex gap-1'>
                <Edit2Icon className={style.icon} onClick={() => updated(product)} /> {/* Pass product record to update handler */}
                <Trash className={style.icon} onClick={() => deleted(product.saleId)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
