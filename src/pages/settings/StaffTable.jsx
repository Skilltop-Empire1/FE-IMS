import React, { useState } from 'react'
import { useGetStaffQuery } from '../../redux/staffApi' // Import the API hook
import moment from 'moment'
import { capitalizedWords } from '../../utils/helpers'
import EditStaffModal from '../../components/modals/EditStaffModal'

const StaffTableSkeleton = () => (
  <div className="animate-pulse">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-10 bg-gray-200 rounded mb-4" />
    ))}
  </div>
)

const StaffTable = () => {
  const [staffInfo, setStaffInfo] = useState(null)
  const [showEditStaffModal, setShowEditStaffModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Page state for pagination
  const pageSize = 10 // Set page size

  // Fetch staff data with pagination parameters (page number and page size)
  const {
    data: staffData,
    isLoading,
    error: staffDataError,
    refetch,
  } = useGetStaffQuery({ page: currentPage, limit: pageSize })
  console.log(staffData)
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-200 text-green-800'
      case 'pending':
        return 'bg-yellow-200 text-yellow-800'
      case 'inactive':
        return 'bg-red-200 text-red-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const editStaff = (id, staff) => {
    setStaffInfo(staff)
    setShowEditStaffModal(true)
  }

  const closeEditStaffModal = () => {
    setStaffInfo(null)
    setShowEditStaffModal(false)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const totalPages = staffData?.pagination?.totalPages || 1

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
                {staffData?.data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-2 px-4 text-center text-sm text-gray-500"
                    >
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  staffData?.data?.map((staff, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-sm">
                        {staff.username || 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b text-sm">
                        {staff.email}
                      </td>
                      <td className="py-2 px-4 border-b text-sm">
                        {moment(staff.added_date).format('DD/MM/yyyy')}
                      </td>
                      <td className="py-2 px-4 border-b text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(staff.status)}`}
                        >
                          {capitalizedWords(staff?.status?.split(' '))}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b text-sm">
                        {staff.role}
                      </td>
                      <td className="py-2 px-4 border-b text-sm">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => editStaff(staff.staffId, staff)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b text-sm">
                        {staff?.storeName || 'No Store'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1 bg-gray-100 text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {staffInfo && showEditStaffModal && (
        <EditStaffModal
          visible={showEditStaffModal}
          staffInfo={staffInfo}
          onClose={closeEditStaffModal}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default StaffTable