import React from 'react';
import style from './storeComponentStyle.module.css';
import { useGetStoresQuery } from '../../redux/storeApi';

const StoreList = ({ onSelectStore }) => {
  const { data: stores, error, isLoading } = useGetStoresQuery();

  if (isLoading) {
    return <div>Loading stores...</div>;
  }

  if (error) {
    return <div>Failed to load stores.</div>;
  }

  // Safely handle the case when stores are not available or empty
  return (
    <div className='flex flex-wrap gap-5 mt-5'>
      {stores?.length > 0 ? (
        stores.map((store, idx) => (
          <div
            key={idx}
            className={style.store}
            onClick={() => onSelectStore(store)}
            style={{backgroundImage: `url(https://be-ims.onrender.com/api/IMS/store/all/${store.storePhoto})`,
            backgroundSize: 'cover', // ensure image covers the div
            backgroundPosition: 'center', // centers the image
          }}
          >
            {store.location}
          </div>
        ))
      ) : (
        <div>No stores available</div>
      )}
    </div>
  );
};

export default StoreList;
