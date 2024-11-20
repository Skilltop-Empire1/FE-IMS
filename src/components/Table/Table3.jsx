import React from 'react';
import style from './tableStyle.module.css';
import { Trash, Edit2Icon } from 'lucide-react';

const Table3 = ({ status, date, api, deleted, updated }) => {
  return (
    <div className="pt-3">
      <table className={style.table}>
        
        <thead>
          <tr className={style.tr}>

            <th>Invoice Number</th>
            <th>Sales Date</th>
            <th>Customers Name</th>
            <th>{status}</th>
            <th>Amount</th>
            <th>Download</th>
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
              <td>{product.Store.storeName.length > 8 ? product.Store?.storeName.substr(0,12) + '...' : product.Store.storeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table3;
