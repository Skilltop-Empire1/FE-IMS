import React, { useState } from 'react'
import {
  useGetStaffQuery,
  useUpdateStaffMutation,
  useUpdateStaffPermissionMutation,
} from '../../redux/staffApi'
import moment from 'moment'
import { capitalizedWords } from '../../utils/helpers'
import EditStaffModal from '../../components/modals/EditStaffModal'
import { PencilIcon } from 'lucide-react'
import RolesPermissionsCard, { roles } from './RolesPermissionsCard'
import SelectPermission from './SelectPermission'

const StaffTableSkeleton = () => (
  <div className="animate-pulse">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-10 bg-gray-200 rounded mb-4" />
    ))}
  </div>
)

const StaffTable = () => {
  const [staffInfo, setStaffInfo] = useState(null)
  const [role, setRole] = useState('') // State for selected role
  const [permissions, setPermissions] = useState([]) // State for permissions
  const [showEditStaffModal, setShowEditStaffModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Page state for pagination
  const pageSize = 10 // Set page size

  const {
    data: staffData,
    isLoading,
    error: staffDataError,
    refetch,
  } = useGetStaffQuery({ page: currentPage, limit: pageSize })
  const [updateStaff] = useUpdateStaffMutation() // Mutation hook for updating staff
  const [updateStaffPermission] = useUpdateStaffPermissionMutation() // Mutation hook for updating staff permission

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

  const handleStaffSelect = (staff) => {
    if (staffInfo?.staffId === staff.staffId) {
      setStaffInfo(null) // Uncheck if already selected
      setRole('')
      setPermissions([])
    } else {
      setStaffInfo(staff) // Select the new staff member
      setRole(staff.role)
      setPermissions(staff?.permissions)
    }
  }

  const handleRoleChange = (newRole) => {
    setRole(newRole)
  }

  const handleUpdateRole = async () => {
    if (staffInfo) {
      await updateStaff({ staffId: staffInfo.staffId, role }) // Update the role
      refetch() // Refetch staff data after update
    }
  }

  const handleUpdatePermission = async () => {
    if (staffInfo) {
      let data = await updateStaffPermission({
        id: staffInfo.staffId,
        permissions,
      }) // Update the role
      console.log({ data })
      refetch() // Refetch staff data after update
    }
  }

  const editStaff = (staff) => {
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

  // Handle permissions change
  const handlePermissionsChange = (updatedPermissions) => {
    setPermissions(updatedPermissions)
    // if (onPermissionsChange) {
    //   onPermissionsChange(updatedPermissions) // Pass updated permissions back to the parent
    // }
  }

  const totalPages = staffData?.pagination?.totalPages || 1

  return (
    <div className="py-5 bg-white">
      {/* {JSON.stringify(staffInfo)} */}
      <div className="container mx-auto p-4">
        {isLoading || staffDataError ? (
          <StaffTableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {[
                    'Select',
                    'Username',
                    'Email',
                    'Added Date',
                    'Status',
                    'Role',
                    'Store Name',
                    'Action',
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2 px-4 bg-gray-100 border-b text-left text-sm font-semibold text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffData?.data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-2 px-4 text-center text-sm text-gray-500"
                    >
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  staffData?.data?.map((staff) => (
                    <tr
                      key={staff.staffId}
                      className={`cursor-pointer ${staffInfo?.staffId === staff.staffId ? 'bg-blue-100' : ''}`}
                    >
                      <td className="py-2 px-4 border-b text-sm">
                        <input
                          type="checkbox"
                          checked={staffInfo?.staffId === staff.staffId}
                          onChange={() => handleStaffSelect(staff)}
                        />
                      </td>
                      {[
                        'username',
                        'email',
                        'added_date',
                        'status',
                        'role',
                        'storeName',
                      ].map((key, index) => (
                        <td
                          key={index}
                          className="py-2 px-4 border-b text-sm"
                          onClick={() => handleStaffSelect(staff)}
                        >
                          {key === 'added_date' ? (
                            moment(staff[key]).format('DD/MM/yyyy')
                          ) : key === 'status' ? (
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(staff.status)}`}
                            >
                              {capitalizedWords(staff.status.split(' '))}
                            </span>
                          ) : (
                            staff[key] || 'N/A'
                          )}
                        </td>
                      ))}
                      <td className="py-2 px-4 border-b text-sm">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => editStaff(staff)}
                        >
                          Edit
                        </button>
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

      {staffInfo && (
        <div className="grid grid-cols-1 gap-4 my-5">
          {/* <div className="flex flex-col gap-4 bg-gray-100 rounded-lg px-8 py-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">Role</span>
              <PencilIcon size={18} />
            </div>
            <div className="flex flex-col gap-3">
              {roles.map(({ label }) => (
                <label
                  key={label}
                  htmlFor={label}
                  className="text-md flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name="role"
                    className="h-5 w-5 rounded-full bg-imsLightPurple border-transparent focus:ring-0"
                    id={label}
                    checked={role === label}
                    onChange={() => handleRoleChange(label)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col gap-4 bg-gray-100 rounded-lg px-4 py-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                Permissions for {staffInfo?.username}
              </span>
              <PencilIcon size={18} />
            </div>
            <div className="flex flex-col gap-4">
              <SelectPermission
                loadedPermissions={staffInfo?.permissions || permissions}
                permissions={staffInfo?.permissions || permissions}
                onPermissionsChange={handlePermissionsChange}
              />
              <button
                className="mt-4 px-4 py-2 bg-imsDarkPurple text-white rounded"
                onClick={handleUpdatePermission}
              >
                Update Permission
              </button>
            </div>
          </div>
        </div>
      )}

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
