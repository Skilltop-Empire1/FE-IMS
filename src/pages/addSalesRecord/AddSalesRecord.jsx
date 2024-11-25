import React, { useState, useEffect } from 'react'
import { useCreateSalesRecordMutation  } from '../../redux/APIs/salesRecordApi' // Import createSale mutation hook
import style from './addSalesRecordStyle.module.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'
import { useGetCategoriesQuery } from '../../redux/categoryApi'
import {  useGetProductsQuery } from '../../redux/APIs/productApi'
import { set } from 'zod'


const AddSaleRecord = () => {
  const [userId, setUserId] = useState() // Assuming user ID is predefined
  const [productId, setProductId] = useState('')
  const [paymentOption, setPaymentOption] = useState('') // Default to cash
  const [quantity, setQuantity] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerNumber, setCustomerNumber] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [storeId, setStoreId] = useState('') // Store ID
  const [success, setSuccess] = useState('hidden')
  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const [formError, setFormError] = useState('')
  const [addAnother, setAddAnother]= useState(false)
  const [products, setProducts] = useState([]) // Assuming you also need a product list
  
  const { data: store, isLoading: storeLoading, error: storeError } = useGetStoresQuery()
  const { data: categorys, isLoading: categorysLoading, error: categorysError } = useGetCategoriesQuery()
  const { data: product, error: productError, isLoading: productLoading } = useGetProductsQuery()
  const [createSalesRecord, { isLoading, error }] = useCreateSalesRecordMutation () // Using the mutation hook
  const navigate = useNavigate()
  const [showFullPaymentModal, setShowFullPaymentModal] = useState(false);
  const [showCreditSalesModal, setShowCreditSalesModal] = useState(false);
  const [showPartPaymentModal, setShowPartPaymentModal] = useState(false);
  const [paymentInformation, setPaymentInformation] = useState(null);
  const [fullSelectedPayment, setFullSelectedPayment] = useState("");
  const [partSelectedPayment, setPartSelectedPayment] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentDate2, setPaymentDate2] = useState("");
  const [paymentDate3, setPaymentDate3] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [totalAmount2, setTotalAmount2] = useState("");
  const [totalAmount3, setTotalAmount3] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [currentAmount2, setCurrentAmount2] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");


  const handleChange = (event) => {
    setFullSelectedPayment(event.target.value);
  };
const handleChange2 = (event) => {
    setPartSelectedPayment(event.target.value);
  };

  useEffect(() => {
    // Toggle modal visibility based on selected payment method
    if (paymentOption === "full") {
      setShowFullPaymentModal(true);
      setShowCreditSalesModal(false);
      setShowPartPaymentModal(false);
    } else if (paymentOption === "credit") {
      setShowCreditSalesModal(true);
      setShowFullPaymentModal(false);
      setShowPartPaymentModal(false);
    } else if (paymentOption === "part_payment") {
      setShowPartPaymentModal(true);
      setShowFullPaymentModal(false);
      setShowCreditSalesModal(false);
    } else {
      setShowFullPaymentModal(false);
      setShowCreditSalesModal(false);
      setShowPartPaymentModal(false);
    }
  }, [paymentOption]);

  const closeModal = () => {
    setShowFullPaymentModal(false);
    setShowCreditSalesModal(false);
    setShowPartPaymentModal(false);
  };






 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.user); // Assuming the token contains a userId field
      // console.log(userId)
  } 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const currentDate = new Date().toISOString() // Get the current date in ISO format

    // const isFull = paymentOption === "full";
    // const isPartPayment = paymentOption === "part_payment";
    // const isCredit = paymentOption === "credit";


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
     
    const real = `${yyyy}-${mm}-${dd}`
    
    
    const saleRecordData = {
      productId,
      quantity,
      customerName,
      customerPhone: customerNumber,
      categoryId,
      storeId,
      paymentOption,
      paymentDate: paymentOption === "full"
        ? paymentDate?.slice(0, 10)
        : paymentOption === "part_payment"
        ? paymentDate3?.slice(0, 10)
        : null,
      paymentMethod: paymentOption === "full"
        ? fullSelectedPayment
        : paymentOption === "part_payment"
        ? partSelectedPayment
        : 'credit',
      totalAmount: paymentOption === "full"
        ? totalAmount
        : paymentOption === "part_payment"
        ? totalAmount3
        : totalAmount2,
      currentPayment: paymentOption === "part_payment"
        ? currentAmount
        : paymentOption === "full"
        ? currentAmount2
        : null,
      nextPaymentDate: paymentOption === "part_payment"
        ? nextDueDate?.slice(0, 10)
        : paymentOption === "credit"
        ? paymentDate2?.slice(0, 10)
        : null,
    };
    

    try {
      console.log(saleRecordData)
      await createSalesRecord(saleRecordData).unwrap()
      setSuccess('')
        // revert success message 
        setTimeout(() => {
          setSuccess('hidden') 
        }, 3000)

        if(addAnother) {
          setProductId('');
          setPaymentOption('');
          setQuantity('');
          setCustomerName('');
          setCustomerNumber('');
          setCategoryId('');
          setStoreId('');
          setPaymentDate('');
          setPaymentDate2('');
          setPaymentDate3('');
          setTotalAmount('');
          setTotalAmount2('');
          setTotalAmount3('');
          setCurrentAmount('');
          setCurrentAmount2('');
          setNextDueDate('');
        }
        else {
          setTimeout(()=>{
            navigate('/app/salesRecords')
          }, 3000)
        }

    } catch (err) {
      console.error('Failed to create sale record:', err)

      if (err?.data?.msg) {
        setFormError(err.data.msg)
        // alert(err.data.msg)
      } else if (err?.error) {
        setFormError(err.error)
        // alert(err.error)
      } else if (err?.data?.message) {
        setFormError(err.data.message)
      }
      else {
          setFormError('An unexpected error occurred. Please try again.')
        }
    }
    }

  return (
    <div className={`${style.body} relative`}>
      <div className='absolute w-full ease-in-out duration-300'>
        <p className={`text-center bg-green-400 py-3 ${success}`} style={{ color: '#fff' }}>Record saved successfully</p>
      </div>
      <div className={style.top}>
        <h2 className={style.title}>Add Sales Record</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={`${style.form} mx-4 my-5 `}>

          {/* Product ID */}
         <div className={`${style.grid} flex`}>
         <div className={style.cont}>
            <label className={style.label}>Product:</label>
            <select
              className={style.input}
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Select Product</option>
              { productLoading ? (
                <option value="">Loading product</option>
              ) : productError ? (
                <option value="">Error loading product</option>
              ) : (
                product.length > 0 ?
                product.map((product) => (
                  <option key={product.prodId} value={product.prodId}>
                    {product.name}
                  </option>
                 )) :
                 <option value="">No products Created</option>
                 )}
            </select>
          </div>

          {/* Payment Method */}
          <div className={style.cont}>
            <label className={style.label}>Payment Option</label>
            <select
              className={style.input}
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              required
            >
              <option value="">Select payment option</option>
              <option value="full">Full Payment</option>
              <option value="part_payment">Part Payment</option>
              <option value="credit">Credit Sales</option>
            </select>
          </div>

          {/* Quantity */}
          <div className={style.cont}>
            <label className={style.label}>Quantity:</label>
            <input
              type="number"
              className={style.input}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Store */}
          <div className={style.cont}>
            <label className={style.label}>Store:</label>
            <select
              className={style.input}
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
            >
               <option value="">Select store</option>
              {storeLoading ? (
                <option value="">Loading stores</option>
              ) : storeError ? (
                <option value="">Error loading stores</option>
              ) : (
                store.length > 0 ? 
                store.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option> 
                )) :
                  <option value="">No stores available</option>
              )}
            </select>
          </div>

          {/* Category */}
          <div className={style.cont}>
            <label className={style.label}>Category:</label>
            <select
              className={style.input}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categorysLoading ? (
                <option value="">Loading Categories</option>
              ) : categorysError ? (
                <option value="">Error Loading Categories</option>
              ) : (
                categorys.categories.length > 0 ?
                categorys.categories.map((category) => (
                  <option key={category.catId} value={category.catId}>
                    {category.name}
                  </option>
                )) :
                <option value="">No category has been created</option>
              )}
            </select>
          </div>
         {/*Customer Name */}
         <div className={style.cont}>
            <label className={style.label}>Customer Name</label>
            <input
              type="text"
              className={style.input}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          
          {/*Customer Number*/}
         <div className={style.cont}>
            <label className={style.label}>Customer Phone No</label>
            <input
              type="number"
              className={style.input}
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
            />
          </div>
          <div>

          </div>
          <div className="mt-8 flex items-center gap-4 text-purple-700">
                <input
                  type="checkbox"
                  name="check"
                  checked={addAnother}
                  onChange={(e) => setAddAnother(e.target.checked)}
                  className={`${style.check} flex items-center justify-center`}
                />
                <label htmlFor="check">Add another record</label>
              </div>
              <div className={style.cont}>
                <div className="flex justify-between items-center mt-8 w-11/12">
                  <button className={style.submit2} disabled={isLoading}>
                    Cancel
                  </button>
                  <button type="submit" className={style.submit} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Sales Record'}
                  </button>
                </div>
              </div>
            
              {formError && (
                  <p className="error-message text-red-500">
                      {formError}
                  </p>
              )}
             
         </div>







                  {/* Full Payment Modal */}
          { showFullPaymentModal &&

            <div className={style.fullPayment}>


              <div className='bg-white w-96 px-10 py-6 rounded-md'>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-2xl'>Full Payment</h2>
                  <p onClick={closeModal} className="cursor-pointer">X</p>
                </div>


                <div className={style.methods}>
                  <h3>Payment Method</h3>
                  <div className='flex justify-between'>
                    <div>
                      <input type="radio" name="payment" value="cash" onChange={handleChange}/>
                      <label htmlFor="cash">Cash</label>
                    </div>
                    <div>
                      <input type="radio" name="payment" value="POS" onChange={handleChange}/>
                      <label htmlFor="cash">POS</label>
                    </div>
                    <div>
                      <input type="radio"name="payment" value="transfer" onChange={handleChange} />
                      <label htmlFor="cash">Transfer</label>
                    </div>
                  </div>
                </div>


                <div className={style.textInput}>
                  <div>
                    <label htmlFor="">Total Amount</label>
                    <input type="text" placeholder='Enter Amount' name='totalAmount' value={totalAmount} onChange={(e)=> setTotalAmount(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">Current Payment</label>
                    <input type="text" placeholder='Enter Amount' name='currentAmount2' value={currentAmount2} onChange={(e)=> setCurrentAmount2(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">Payment Date</label>
                    <input type="date" placeholder='Enter Amount' name='paymentDate' value={paymentDate} onChange={(e)=> setPaymentDate(e.target.value)}/>
                  </div>
                  {/* <div>
                    <label htmlFor="">Ref No</label>
                    <input type="text" placeholder='Enter Amount'/>
                  </div> */}
                  <button className='bg-purple-700 text-white py-2 rounded-md hover:bg-purple-950' onClick={closeModal}>Save</button>
                </div>
              </div>
            </div>
          }
          
          
          
          
          
          
          
                {/* Credit Modal */}
          {showCreditSalesModal &&

            <div className={style.fullPayment}>


              <div className='bg-white w-96 px-10 py-6 rounded-md'>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-2xl'>Credit Sales</h2>
                  <p onClick={closeModal} className="cursor-pointer">X</p>
                </div>


                <div className={style.textInput}>
                  <div>
                    <label htmlFor="">Total Amount</label>
                    <input type="text" placeholder='Enter Amount' name='totalAmount2' value={totalAmount2} onChange={(e)=> setTotalAmount2(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">Payment Due Date</label>
                    <input type="date" placeholder='Enter Amount' name='paymentDate2' value={paymentDate2} onChange={(e)=> setPaymentDate2(e.target.value)}/>
                  </div>
                  <button className='bg-purple-700 text-white py-2 rounded-md hover:bg-purple-950' onClick={closeModal}>Save</button>
                </div>
              </div>
            </div>
          }








              {/* Part Payment Modal */}
          { showPartPaymentModal &&
            <div className={style.fullPayment}>


              <div className='bg-white w-96 px-10 py-6 rounded-md h-[80%] overflow-y-auto'>
                <div className='flex justify-between'>
                  <h2 className='font-bold text-2xl'>Part Payment</h2>
                  <p onClick={closeModal}className="cursor-pointer">X</p>
                </div>


                <div className={style.methods}>
                  <h3>Payment Method</h3>
                  <div className='flex justify-between'>
                    <div>
                      <input type="radio" name="payment" value="cash" onChange={handleChange2}/>
                      <label htmlFor="cash">Cash</label>
                    </div>
                    <div>
                      <input type="radio" name="payment" value="POS" onChange={handleChange2}/>
                      <label htmlFor="cash">POS</label>
                    </div>
                    <div>
                      <input type="radio"name="payment" value="transfer" onChange={handleChange2} />
                      <label htmlFor="cash">Transfer</label>
                    </div>
                  </div>
                </div>


                <div className={style.textInput}>
                  <div>
                    <label htmlFor="">Total Amount</label>
                    <input type="text" placeholder='Enter Amount' name='totalAmount3' value={totalAmount3} onChange={(e)=> setTotalAmount3(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">Current Payment</label>
                    <input type="text" placeholder='Enter Amount' name='currentAmount' value={currentAmount} onChange={(e)=> setCurrentAmount(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">Payment Date</label>
                    <input type="date" placeholder='Enter Amount' name='paymentDate3' value={paymentDate3} onChange={(e)=> setPaymentDate3(e.target.value)}/>
                  </div>
                   {/* <div>
                    <label htmlFor="">Balance</label>
                    <input type="text" placeholder='Enter Amount'/>
                  </div> */}
                  <div>
                    <label htmlFor="">Next Payment Due Date</label>
                    <input type="date" placeholder='Enter Amount' name='nextDueDate' value={nextDueDate} onChange={(e)=> setNextDueDate(e.target.value)}/>
                  </div>
                  <button className='bg-purple-700 text-white py-2 rounded-md hover:bg-purple-950' onClick={closeModal}>Save</button>
                </div>
              </div>
            </div>
          }


















            {/* <br /> */}
            
              
        </form>
      </div>
    </div>
  )
}

export default AddSaleRecord
