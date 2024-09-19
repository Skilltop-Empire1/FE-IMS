import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter';
import Table from '../../components/Table/Table';
import { useGetLocationsQuery } from '../../redux/storeApi';
import { useGetProductsQuery } from '../../redux/productApi';

const SalesRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Fetch products using RTK Query
  const { data: products, error, isLoading } = useGetProductsQuery();

  // Fetch locations
  const { data: locations, error: locationError, isLoading: locationLoading } = useGetLocationsQuery();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://be-ims.onrender.com/api/IMS/store/filter');
      const data = await response.json();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Handle filter selection
  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  // Filter products based on search term and selected category
  const filteredItems = products?.filter((item) => {
    // Check if item matches the search term
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);

    // Check if item matches the selected category
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filter Section */}
      <Filter 
        handleSearch={handleSearch} 
        handleFilter={handleFilter} 
        direction='addProduct' 
        title='Sales Record' 
        button='+ Add Record' 
        location={locations}  // Pass categories to the Filter component
        search='search by name'
      />
      
      {/* Products Table Section */}
      {
        isLoading ? ( 
          <p>Loading...</p> 
        ) : error ? ( 
          <p>Error loading products</p> 
        ) : (
          <Table status='Alert Status' date='Date' api={filteredItems} />  // Display filtered products
        )
      }
    </div>
  );
}

export default SalesRecord;
