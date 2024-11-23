import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./tableStyle.module.css";
import { Trash, Edit2Icon, EyeIcon, Printer } from "lucide-react";

const Table2 = ({ status, date, api = [], deleted, updated, view, runPrint, printref, selectedRows, toggleRowSelection, selectAllRows }) => {
  const [action, setAction] = useState({});
  // const [selectedRows, setSelectedRows] = useState([]);
  const actionRef = useRef(null);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(api.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, api.length);
  const currentData = api.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setAction({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openAction = (index) => {
    setAction((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // const toggleRowSelection = (saleId) => {
  //   setSelectedRows((prevSelected) =>
  //     prevSelected.includes(saleId)
  //       ? prevSelected.filter((id) => id !== saleId)
  //       : [...prevSelected, saleId]
  //   );
  // };

  // const selectAllRows = (isChecked) => {
  //   setSelectedRows(isChecked ? currentData.map((item) => item.saleId) : []);
  // };

  // const contentRef = useRef();

  // const handlePrint = useReactToPrint({
  //   contentRef
  // });

 const printDayDate = new Date()
//  console.log(printDayDate.getDate())

  const SelectedRowsComponent = React.forwardRef((props, ref) => {
    const selectedData = api.filter((item) => selectedRows.includes(item.saleId));
    return (
      <div ref={ref}>
        <div className="flex gap-2 items-baseline">
          <img src={selectedData[0]?.Store?.storePhoto} alt="" className="w-16 h-16 " />
          <p className="text-3xl">{selectedData[0]?.Store?.storeName}</p>
        </div>
          <p className="text-xl mx-2">{selectedData[0]?.Store?.location}</p>
        <div className="bg-[#FAF4FF] p-3">
          <div className="flex items-center gap-5">
            <h2 className="text-3xl">Invoice</h2>
            <div className="flex">
              <p>Date: .</p>
              <p>{printDayDate.getDay()}/</p>
              <p>{printDayDate.getMonth()}/</p>
              <p>{printDayDate.getFullYear()}</p>
            </div>
            <p> Payment Date: {selectedData[0]?.paymentDueDate?.slice(0,10)}</p>
          </div>
          <div className="flex gap-3">
            <h2>customers Name: {selectedData[0]?.customerName}</h2>
            <h2>customers Number: {selectedData[0]?.customerPhone}</h2>
          </div>
            <h2>payment Method: {selectedData[0]?.paymentOption}</h2>

        </div>
        <table className={`${style.table} ms-3`}>
          <thead>
            <tr className={style.tr}>
              <th>Product Photo</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((product) => (
              <tr key={product.saleId}>
                <td>
                  <img
                    src={product.Product.prodPhoto}
                    alt={product.Product.name}
                    className={style.productImage}
                  />
                </td>
                <td>{product.Product.name}</td>
                <td>{product.quantity}</td>
                <td>₦{product.productPrice}</td>
                <td>{product.productPrice * product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2 className="text-xl m-3">Summary Section</h2>
          <div className=" bg-[#FAF4FF] p-3">
            <div className="w-1/2 flex justify-between">
            <h2 className="text-xl font-bold">Summary Field</h2>
            <h2 className="text-xl font-bold">Amount</h2>
            </div>

          </div>
          <div className=" p-3">
           <div className="w-1/2 flex justify-between">
            <h2 className="text-xl ">Grand total</h2>
            <h2 className="text-xl ">{selectedData?.reduce((sum, record) => sum + Number(record.totalAmount || 0), 0)}</h2>
           </div>
          </div>
          <div className="flex justify-between  p-3">
            <div className="w-1/2 flex justify-between">
              <h2 className="text-xl ">Payment Method</h2>
              <h2 className="text-xl ">{selectedData[0]?.paymentMethod}</h2>
            </div>
          </div>
          <div className="flex justify-between p-3">
              <div className="w-1/2 flex justify-between">
               <h2 className="text-xl ">Payment Option</h2>
               <h2 className="text-xl ">{selectedData[0]?.paymentOption}</h2>
              </div>
          </div>
          <div className="flex justify-between  p-3">
            <div className="w-1/2 flex justify-between">
              <h2 className="text-xl ">Balance Due</h2>
              <h2 className="text-xl ">{selectedData?.reduce((sum, record) => sum + Number(record.balance || 0), 0)}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="pt-3">
      <div className="flex justify-between items-center">
      </div>
      <table className={style.table}>
        <thead>
          <tr className={style.tr}>
            <th>
              <input
                type="checkbox"
                onChange={(e) => selectAllRows(e.target.checked)}
                checked={selectedRows.length === currentData.length}
              />
            </th>
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
          {currentData.map((product, idx) => (
            <tr key={product.saleId}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(product.saleId)}
                  onChange={() => toggleRowSelection(product.saleId)}
                />
              </td>
              <td>
                <img
                  src={product.Product.prodPhoto}
                  alt={product.Product.name}
                  className={style.productImage}
                />
              </td>
              <td>{product.Product.name}</td>
              <td>{product.paymentOption}</td>
              <td>{product.quantity}</td>
              <td>₦ {product.totalAmount}</td>
              <td>{product.Store.storeName}</td>
              <td>{product.soldDate?.substr(0, 10)}</td>
              <td>
                <div onClick={() => openAction(idx)} className={style.actionMama}>
                  ...
                </div>
                {action[idx] && (
                  <div className={`${style.action}`} ref={actionRef}>
                    <p
                      className="flex gap-3 text-sm "
                      onClick={() => view(product)}
                    >
                      <EyeIcon size={20} className={style.icon2} />
                      View
                    </p>
                    <hr />
                    <p
                      onClick={() => updated(product)}
                      className="flex gap-3 text-sm "
                    >
                      <Edit2Icon size={20} className={style.icon2} />
                      Edit
                    </p>
                    <hr />
                    <p className="flex gap-3 text-sm ">
                      <Printer size={20} className={style.icon2} />
                      Print
                    </p>
                    <hr />
                    <p
                      onClick={() => deleted(product.saleId)}
                      className="flex text-sm gap-3"
                    >
                      <Trash size={20} className={style.icon2} />
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`${style.pagination}`}>
        {/* Pagination buttons */}
        <div>
        <span>
          Showing {startIndex + 1} to{" "}
          {currentPage === totalPages ? api.length : currentPage * itemsPerPage}{" "}
          of {api.length} entries (Filtered from {api.length} total entries)
        </span>
        </div>
        <div className={`${style.pagination}`}>
             <button
                onClick={() => goToPage(1)}
                className={style.pageButton}
                disabled={currentPage === 1}
              >
                 &lt;&lt;
              </button>

              <button
                onClick={() => goToPage(currentPage - 1)}
                className={style.pageButton}
                disabled={currentPage === 1}
              >
                 &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                if (index + 1 === currentPage || index + 1 === currentPage - 1) {
                  return (
                    <button
                      key={index}
                      onClick={() => goToPage(index + 1)}
                      className={
                        currentPage === index + 1 ? style.pageButton : ""
                      }
                    >
                      {index + 1}
                    </button>
                  );
                }
                return null; // Don't render anything for other indexes
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                className={style.pageButton}
                disabled={currentPage === totalPages}
              >
                 &gt;
              </button>

              <button
                onClick={() => goToPage(totalPages)}
                className={style.pageButton}
                disabled={currentPage === totalPages}
              >
                 &gt;&gt;
              </button>
          </div>
      </div>

      {/* Hidden Component for Printing */}
      <div className="hidden">
        <SelectedRowsComponent ref={printref} />
      </div>
    </div>
  );
};

export default Table2;
