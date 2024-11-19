import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransferProductHistory = () => {


    const navigate = useNavigate();
    // Mock data for transfer history
    const mockData = Array(10).fill({
        productPhoto: '/path/to/photo.png', // Replace with actual path
        productName: 'Cake',
        currentStore: 'Ogo Pastries',
        currentCategory: 'Cake',
        destinationStore: 'Ogo Cakes',
        destinationCategory: 'Baked Goods',
        quantityTransferred: 12,
        dateTransferred: '2024-10-25',
    });

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filtered data based on search
    const filteredData = mockData.filter((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">Transfer History</h1>
                <button onClick={() => navigate("/app/products")} className="bg-imsPurple text-white px-4 py-2 rounded-md">
                    Back to Products
                </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-md px-4 py-2"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Product Photo</th>
                            <th className="border px-4 py-2 text-left">Product Name</th>
                            <th className="border px-4 py-2 text-left">Current Store</th>
                            <th className="border px-4 py-2 text-left">Current Category</th>
                            <th className="border px-4 py-2 text-left">Destination Store</th>
                            <th className="border px-4 py-2 text-left">Destination Category</th>
                            <th className="border px-4 py-2 text-left">Quantity Transferred</th>
                            <th className="border px-4 py-2 text-left">Date Transferred</th>
                            <th className="border px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        <img
                                            src={item.productPhoto}
                                            alt={item.productName}
                                            className="w-12 h-12 object-cover"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{item.productName}</td>
                                    <td className="border px-4 py-2">{item.currentStore}</td>
                                    <td className="border px-4 py-2">{item.currentCategory}</td>
                                    <td className="border px-4 py-2">{item.destinationStore}</td>
                                    <td className="border px-4 py-2">{item.destinationCategory}</td>
                                    <td className="border px-4 py-2">{item.quantityTransferred}</td>
                                    <td className="border px-4 py-2">{item.dateTransferred}</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-gray-600">...</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center py-4">
                <span>
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
                    {filteredData.length} entries
                </span>
                <div className="flex items-center gap-2">
                    <button
                        className="px-2 py-1 border rounded-md"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        {'<'}
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-1 border rounded-md ${page === currentPage ? 'bg-imsPurple text-white' : ''
                                }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="px-2 py-1 border rounded-md"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferProductHistory;
