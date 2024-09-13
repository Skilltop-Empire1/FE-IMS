import React, { useState } from 'react'
import Filter from '../../components/Filter/Filter'

const Stores = () => {
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

  return (
    <div>
      <Filter handleSearch={handleSearch} handleFilter={handleFilter} direction='addProduct' title='Stores' button='+ Create Store'/>
    </div>
  )
}

export default Stores
