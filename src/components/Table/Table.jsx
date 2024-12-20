import React from 'react'
import { motion } from 'framer-motion'
import style from './tableStyle.module.css'
import BUtton from '../Button/Button'
import { Trash, Edit2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const Table = ({ status, date, api, prod, deleted, updated }) => {
  // console.log({ api })
  return (
   <div className='pt-3 w-[100%]'>
     <div className=" overflow-x-auto w-[100%]">
      <table className={style.table}>
        <thead>
          <tr className={`${style.tr}`}>
            {/* <th> </th> */}
            <th>Product Photo</th>
            <th>Product Name</th>
            <th>{status}</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Category</th>
            <th>Store Name</th>
            <th>{date}</th>
            <th>Transfer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={prod}>
          {api
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((product, idx) => (
            <tr key={idx}>
              {/* <td>
                <input type="checkbox" />
              </td> */}
              <td>
                <img src={product.prodPhoto} alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>
                {/* <BUtton
                  buttonName={
                    product.quantity > product.alertStatus
                      ? 'Active'
                      : product.quantity === 0
                        ? 'Empty'
                        : 'Low'
                  }
                  className={`me-5 !bg-[#6c30b6] text-white outline-none block w-full ${product.quantity > product.alertStatus
                    ? "!text-green-600"
                    : product.quantity === 0
                      ? 'text-white'
                      : "!text-red-600"}`}
                /> */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  onClick={() => window.print()}
                  className={clsx(
                    `w-full max-w-[80px] rounded px-2 py-1.5 text-[13px] border flex items-center justify-center cursor-pointer`,
                    {
                      'border-green-600 text-green-600 hover:bg-green-600 hover:text-white':product.quantity > product.alertStatus,
                      'border-red-600 text-red-600 hover:bg-red-600 hover:text-white':
                        product.quantity <= product.alertStatus,
                    },
                  )}
                >
                  {product.quantity > product.alertStatus && 'ACTIVE'}{' '}
                  {product.quantity <= product.alertStatus && 'LOW'}
                </motion.div>
              </td>
              <td>{product.quantity}</td>
              <td>₦ {product.price}</td>
              <td>{product.Category.name}</td>
              <td>
                {product?.storeAvailable?.length > 8
                  ? product.storeAvailable.substr(0, 12) + '...'
                  : product.storeAvailable}
              </td>
              <td>{product.createdAt.substr(0, 10)}</td>
              <td>
                <Link
                  to={`/app/products/transfer/${product.prodId}`}
                  className="text-imsPurple hover:text-imsDarkPurple"
                  title="click to transfer product"
                >
                  Transfer
                </Link>
              </td>
              <td className="">
                <div className='flex gap-1 items-center  justify-center'>
                  <Edit2Icon
                    className={style.icon}
                    onClick={() => updated(product)}
                  />
                  <Trash
                    className={style.icon}
                    onClick={() => deleted(product.prodId)} // Pass the product ID to the delete function
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </div>
  )
}

export default Table
