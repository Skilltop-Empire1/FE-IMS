import React from 'react'
import style from './tableStyle.module.css'
import BUtton from '../Button/OtherButton'

const Table = ({status, date}) => {
  return (
    <div className='pt-3'>
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
            <tr>
                <td><input type="checkbox" /></td>
                <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bVUUPyZR8fspF-0txsgt5N_eAIDasisy6A&s" alt="" /></td>
                <td>Shirt</td>
                <td><BUtton buttonName='Active' /></td>
                <td>10</td>
                <td>T-Shirt</td>
                <td>3-store</td>
                <td>date</td>
                <td>delete/edit</td>
            </tr><tr>
                <td><input type="checkbox" /></td>
                <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bVUUPyZR8fspF-0txsgt5N_eAIDasisy6A&s" alt="" /></td>
                <td>Shirt</td>
                <td><BUtton buttonName='Active' /></td>
                <td>10</td>
                <td>T-Shirt</td>
                <td>3-store</td>
                <td>date</td>
                <td>delete/edit</td>
            </tr><tr>
                <td><input type="checkbox" /></td>
                <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bVUUPyZR8fspF-0txsgt5N_eAIDasisy6A&s" alt="" /></td>
                <td>Shirt</td>
                <td><BUtton buttonName='Active' /></td>
                <td>10</td>
                <td>T-Shirt</td>
                <td>3-store</td>
                <td>date</td>
                <td>delete/edit</td>
            </tr><tr>
                <td><input type="checkbox" /></td>
                <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bVUUPyZR8fspF-0txsgt5N_eAIDasisy6A&s" alt="" /></td>
                <td>Shirt</td>
                <td><BUtton buttonName='Active' /></td>
                <td>10</td>
                <td>T-Shirt</td>
                <td>3-store</td>
                <td>date</td>
                <td>delete/edit</td>
            </tr><tr>
                <td><input type="checkbox" /></td>
                <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bVUUPyZR8fspF-0txsgt5N_eAIDasisy6A&s" alt="" /></td>
                <td>Shirt</td>
                <td><BUtton buttonName='Active' /></td>
                <td>10</td>
                <td>T-Shirt</td>
                <td>3-store</td>
                <td>date</td>
                <td>delete/edit</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
