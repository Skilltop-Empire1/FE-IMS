import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Filter from '../../components/Filter/Filter'
import StoreList from '../../components/StoreComponent/StoreList'
import StoreDetail from '../../components/StoreComponent/StoreDetail'
import { useLocation } from 'react-router'
import {
  useGetLocationsQuery,
  useGetStoresQuery,
} from '../../redux/APIs/storeApi'

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filteredItems, setFilteredItems] = useState([])

  // Fetch locations
  const { data: locations = [], error: locationError, isLoading: locationLoading } = useGetLocationsQuery();
  
  // Fetch stores
  const { data: stores = [], error: storesError, isLoading: storesLoading, refetch, isFetching } = useGetStoresQuery();
  // const currentUser = useSelector((state) => state.auth.user);
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/app/stores') {
      refetch(); // Refetch stores when the user switches
    }
  }, [location.pathname, refetch]);

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Handle filter category
  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  // Update filteredItems based on search and filter criteria
  useEffect(() => {
    if (stores.length) {
      // Safely sort stores by location
      const sortedData = stores?.slice().sort((a, b) => {
        const locationA = a.location || '';
        const locationB = b.location || '';
        return locationA.localeCompare(locationB);
      });

      // Filter stores based on search term and category
      const filtered = sortedData.filter((store) => {
        // Match search term
        const matchesSearch =
          store.location.toLowerCase().includes(searchTerm) ||
          store.storeName.toLowerCase().includes(searchTerm)

        // Match selected category
        const matchesCategory =
          filterCategory === 'all' || store.location === filterCategory

        return matchesSearch && matchesCategory;
      });

      setFilteredItems(filtered);
    }
  }, [stores, searchTerm, filterCategory])

  // Handle selected store
  const handleSelectedStore = (store) => {
    setSelectedStore(store)
  }

  return (
    <div>
      {/* Filter Component */}
      <Filter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        direction="/app/createStore"
        title="Stores"
        button="+ Create Store"
        location={locations}
        search="search"
      />

      {/* Store List Component */}
      {storesLoading || isFetching ? (
         <div className='animate-pulse flex gap-4'>
          {Array(3).fill().map((_, i) => (        
            <div key={i} className='h-44 w-44 bg-slate-300 rounded-3xl'></div>
          ))}
             
        </div>
      ) : storesError ? (
        <p>Error loading stores.</p>
      ) : (
        <StoreList onSelectStore={handleSelectedStore} items={filteredItems} />
      )}

      {/* Store Detail Component */}
      <StoreDetail selectedStore={selectedStore} />
     
    </div>
  );
};

export default Stores;
