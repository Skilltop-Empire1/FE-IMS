import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter';
import StoreList from '../../components/StoreComponent/StoreList';
import StoreDetail from '../../components/StoreComponent/StoreDetail';
import { useGetLocationsQuery, useGetStoresQuery } from '../../redux/APIs/storeApi';

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch locations
  const { data: locations, error: locationError, isLoading: locationLoading } = useGetLocationsQuery();
  
  // Fetch stores
  const { data: stores, error: storesError, isLoading: storesLoading } = useGetStoresQuery();

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase())
  }

  // Handle filter category
  const handleFilter = (category) => {
    setFilterCategory(category)
  }

  // Update filteredItems based on search and filter criteria
  useEffect(() => {
    if (stores) {
      const filtered = stores.filter((store) => {
        // Match search term
        const matchesSearch = store.location.toLowerCase().includes(searchTerm) || store.storeName.toLowerCase().includes(searchTerm);

        // Match selected category
        const matchesCategory = filterCategory === 'all' || store.location === filterCategory;

        return matchesSearch && matchesCategory;
      });
      setFilteredItems(filtered);
    }
  }, [stores, searchTerm, filterCategory]);

  // Handle selected store
  const handleSelectedStore = (store) => {
    setSelectedStore(store);
  };

  return (
    <div>
      {/* Filter Component */}
      <Filter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        direction="createStore"
        title="Stores"
        button="+ Create Store"
        location={locations}
        search='search'
      />

      {/* Store List Component */}
      {storesLoading ? (
        <p>Loading stores...</p>
      ) : storesError ? (
        <p>Error loading stores.</p>
      ) : (
        <StoreList onSelectStore={handleSelectedStore} items={filteredItems} />
      )}

      {/* Store Detail Component */}
      <StoreDetail selectedStore={selectedStore} />
    </div>
  )
}

export default Stores
