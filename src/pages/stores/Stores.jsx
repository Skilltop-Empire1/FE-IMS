import React, { useState } from 'react'
import Filter from '../../components/Filter/Filter'
import StoreList from '../../components/StoreComponent/StoreList';
import StoreDetail from '../../components/StoreComponent/StoreDetail';

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null)
  const [items, setItems] = useState();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  // const filteredItems = items.filter((item) => {
  //   // Check if item matches the search term
  //   const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    
  //   // Check if item matches the selected category
  //   const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
  //   return matchesSearch && matchesCategory;
  // });


  //recieving data

  const handleSelectedStore = (store) => {
    setSelectedStore(store)
  }

  return (
    <div>
      
      <Filter handleSearch={handleSearch} handleFilter={handleFilter} direction='createStore' title='Stores' button='+ Create Store'/>
      <StoreList onSelectStore={handleSelectedStore}/>
      <StoreDetail selectedStore={selectedStore}/>
    </div>
  )
}

export default Stores
