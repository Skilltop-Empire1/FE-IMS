import React from 'react'
import { useGetStaffQuery } from '../../redux/staffApi' // Import the API hook

const StaffTableSkeleton = () => (
  <div className="animate-pulse">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-10 bg-gray-200 rounded mb-4" />
    ))}
  </div>
)

const StaffTable = () => {
  const {
    data: staffData,
    isLoading,
    error: staffDataError,
  } = useGetStaffQuery() // Fetch the staff data

  console.log({ staffDataError, staffData })

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
        {isLoading || staffDataError ? (
          <StaffTableSkeleton /> // Display skeleton loader when data is loading
        ) : (
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
                {staffData?.map((staff, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-sm">
                      {staff.username}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      {staff.email}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      {staff.addedDate}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(staff.status)}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-sm">{staff.role}</td>
                    <td className="py-2 px-4 border-b text-sm">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      {staff.storeName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default StaffTable
