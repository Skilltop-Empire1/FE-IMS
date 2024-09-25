import React, { useState } from 'react';
import style from './storeComponentStyle.module.css';
import { useGetStoresQuery } from '../../redux/APIs/storeApi';

const StoreList = ({ onSelectStore, items }) => {
  // Local state to track the selected store
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const { data: stores, error, isLoading } = useGetStoresQuery();

  const handleStoreClick = (store) => {
    // Set the selected store ID to the clicked one
    setSelectedStoreId(store.id); // Assuming `store.id` is unique
    onSelectStore(store); // Send the selected store to the parent component
  };

  return (
    <div className='flex flex-wrap gap-5 mt-5'>
      {stores?.length > 0 ? (
        items.map((store, idx) => (
          <div
            key={idx}
            className={`${style.store} ${selectedStoreId === store.id ? style.selected : ''}`} // Conditionally add the `selected` class
            onClick={() => handleStoreClick(store)}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `linear-gradient(0deg, rgb(121 0 255 / 25%), rgb(81 3 163 / 39%)),  url(${store.storePhoto})`,
              filter: selectedStoreId === store.id ? 'brightness(0.5)' : 'none', // Darken the background of the selected store
              transition: 'filter 0.3s ease', // Smooth transition when changing the background
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
