import React , { useState }from 'react'
import Filter from '../../components/Filter/Filter'
import Table from '../../components/Table/Table'
import { useGetLocationsQuery } from '../../redux/storeApi';


const Products = () => {
  const [items, setItems] = useState();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };


    //get location data

    const { data: locations, error, isLoading } = useGetLocationsQuery()

  // const filteredItems = items.filter((item) => {
  //   // Check if item matches the search term
  //   const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    
  //   // Check if item matches the selected category
  //   const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
  //   return matchesSearch && matchesCategory;
  // });

  return (
    <div>
      <div>
      <Filter handleSearch={handleSearch} handleFilter={handleFilter} direction='addProduct' title='Products' button='+ Add Product' location={locations}/>
      <Table status='Alert Status' date={'date'}/>
      </div>
      
    </div>
  )
}

export default Products
