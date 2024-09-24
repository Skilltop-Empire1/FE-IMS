import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter';
import Table from '../../components/Table/Table2';
import { useGetLocationsQuery } from '../../redux/APIs/storeApi';
import { useGetSalesRecordQuery } from '../../redux/APIs/salesRecordApi';

const SalesRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Fetch sales records using RTK Query
  const { data: salesRecord, error: salesError, isLoading: salesLoading } = useGetSalesRecordQuery();

  // Fetch locations
  const { data: locations, error: locationError, isLoading: locationLoading } = useGetLocationsQuery();

  // Fetch categories (if needed for filtering)
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

  // Filter sales records based on search term and selected category
  const filteredItems = salesRecord?.filter((item) => {
    // Check if item matches the search term (paymentMethod in this case)
    const matchesSearch = item.paymentMethod.toLowerCase().includes(searchTerm);

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
        direction='addSaleRecord' 
        title='Sales Record' 
        button='+ Add Record' 
        location={locations}  // Pass locations to the Filter component
        categories={categories}  // Pass categories to the Filter component
        search='search by payment method'
      />
      
      {/* Sales Record Table Section */}
      {
        salesLoading || locationLoading ? ( 
          <p>Loading...</p> 
        ) : salesError || locationError ? ( 
          <p>Error loading data</p> 
        ) : (
          <Table status='Alert Status' date='Date' api={filteredItems}/>  // Display filtered sales records
        )
      }
    </div>
  );
};

export default SalesRecord;
