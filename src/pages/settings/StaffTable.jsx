import React from 'react'

const StaffTable = () => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-200 text-green-800'
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800'
      case 'Inactive':
        return 'bg-red-200 text-red-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }
  return (
    <div className="py-5 bg-white">
      <div className="container mx-auto p-4">
        {/* <!-- Table --> */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Added Date
                </th>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
                <th className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700">
                  Store Name
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-sm">{row.username}</td>
                  <td className="py-2 px-4 border-b text-sm">{row.email}</td>
                  <td className="py-2 px-4 border-b text-sm">
                    {row.addedDate}
                  </td>
                  <td className="py-2 px-4 border-b text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-sm">{row.role}</td>
                  <td className="py-2 px-4 border-b text-sm">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-sm">
                    {row.storeName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <!-- Pagination --> */}
        {/* <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Showing 1 to 10 of 50 entries</p>
          <nav className="inline-flex">
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-l hover:bg-gray-200">
              Previous
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200">
              3
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200">
              4
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-r hover:bg-gray-200">
              Next
            </button>
          </nav>
        </div> */}
      </div>
    </div>
  )
}

export default StaffTable

const tableData = [
  {
    username: 'Test Employee1',
    email: 'john.doe@example.com',
    addedDate: '09/09/2024',
    status: 'Active',
    role: 'Admin',
    storeName: 'Store 1',
  },
  {
    username: 'Test Employee2',
    email: 'jane.smith@example.com',
    addedDate: '09/09/2024',
    status: 'Active',
    role: 'Manager',
    storeName: 'Store 2',
  },
  {
    username: 'Test Employee3',
    email: 'sam.wilson@example.com',
    addedDate: '09/09/2024',
    status: 'Pending',
    role: 'User',
    storeName: 'Store 3',
  },
  {
    username: 'Test Employee4',
    email: 'emma.brown@example.com',
    addedDate: '09/09/2024',
    status: 'Inactive',
    role: 'User',
    storeName: 'Store 4',
  },
  {
    username: 'Test Employee5',
    email: 'emma.brown@example.com',
    addedDate: '09/09/2024',
    status: 'Inactive',
    role: 'User',
    storeName: 'Store 4',
  },
  // Add more rows as needed
]
