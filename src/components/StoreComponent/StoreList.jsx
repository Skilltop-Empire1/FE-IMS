import React from 'react';
import style from './storeComponentStyle.module.css';

const StoreList = ({ onSelectStore, items }) => {
  // Safely handle the case when stores are not available or empty
  return (
    <div className='flex flex-wrap gap-5 mt-5'>
      {items?.length > 0 ? (
        items.map((store, idx) => (
          <div
            key={idx}
            className={style.store}
            onClick={() => onSelectStore(store)}
            style={{
              backgroundImage: `url(${store.storePhoto})`,
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
