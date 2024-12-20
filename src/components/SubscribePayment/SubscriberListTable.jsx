import React, { useState } from 'react'
import {
  useUpdateStaffMutation,
  useUpdateStaffPermissionMutation,
} from '../../redux/staffApi'
import moment from 'moment'
import { capitalizedWords } from '../../utils/helpers'
import EditStaffModal from '../modals/EditStaffModal'
import { useGetRequestDemoQuery } from '../../redux/requestDemoApi'
import EditSubscriptionModal from '../modals/EditSubscriptionModal'

const StaffTableSkeleton = () => (
  <div className="animate-pulse">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-10 bg-gray-200 rounded mb-4" />
    ))}
  </div>
)

const SubscriberListTable = () => {
  const [subscriptionInfo, setStaffInfo] = useState(null)
  const [role, setRole] = useState('') // State for selected role
  const [permissions, setPermissions] = useState([]) // State for permissions
  const [showEditSubscriptionModal, setShowEditStaffModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Page state for pagination
  const pageSize = 10 // Set page size

  const {
    data: subscriberData,
    isLoading,
    error: subscriberDataError,
    refetch,
  } = useGetRequestDemoQuery({ page: currentPage, limit: pageSize })
  const [updateStaff] = useUpdateStaffMutation() // Mutation hook for updating staff
  const [
    updateStaffPermission,
    { isLoading: isLoadingMutation, isSuccess, isError, error },
  ] = useUpdateStaffPermissionMutation() // Mutation hook for updating staff permission

  console.log({ subscriberData })
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
    if (subscriptionInfo?.staffId === subscriber.staffId) {
      setStaffInfo(null) // Uncheck if already selected
      setRole('')
      setPermissions([])
    } else {
      setStaffInfo(staff) // Select the new staff member
      setRole(subscriber.role)
      setPermissions(staff?.permissions)
    }
  }

  const handleRoleChange = (newRole) => {
    setRole(newRole)
  }

  const handleUpdateRole = async () => {
    if (subscriptionInfo) {
      await updateStaff({ staffId: subscriptionInfo.staffId, role }) // Update the role
      refetch() // Refetch staff data after update
    }
  }
  const handleUpdatePermission = async () => {
    if (subscriptionInfo) {
      let data = await updateStaffPermission({
        id: subscriptionInfo.staffId,
        permissions: { permissions },
      }) // Update the role
      refetch() // Refetch staff data after update
    }
  }

  const editSubscription = (staff) => {
    setStaffInfo(staff)
    setShowEditStaffModal(true)
  }

  const closeEditSubscriptionModal = () => {
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

  const totalPages = subscriberData?.pagination?.totalPages || 1

  return (
    <div className="py-5 bg-white">
      {/* {JSON.stringify(subscriptionInfo)} */}
      <div className="container mx-auto p-4">
        {isLoading || subscriberDataError ? (
          <StaffTableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {[
                    'Select',
                    'Business Name',
                    'Code',
                    'Subscription',
                    'Payment Data',
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
                {subscriberData?.codes?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-2 px-4 text-center text-sm text-gray-500"
                    >
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  subscriberData?.codes?.map((subscriber, index) => (
                    <tr
                      key={subscriber.payId}
                      className="cursor-pointer bg-blue-100"
                    >
                      <td className="py-2 px-4 border-b text-sm">
                        {index + 1}
                      </td>
                      {['businessName', 'Code', 'subType', 'Payment'].map(
                        (key, index) => (
                          <td
                            key={index}
                            className="py-2 px-4 border-b text-sm"
                          >
                            {key === 'businessName' ? (
                              <>
                                <p>{subscriber[key]}</p>
                                <p className="text-[10px]">
                                  {subscriber.phone}
                                </p>
                                <p className="text-[10px]">
                                  {subscriber.email}
                                </p>
                              </>
                            ) : key === 'Payment' ? (
                              <>
                                <p>N{subscriber.Payment.amount ?? 'N/A'}</p>
                                <p>
                                  {subscriber.Payment.paymentStatus ?? 'N/A'}
                                </p>
                                <p className="text-[10px]">{subscriber.code}</p>
                                <p className="text-xs">
                                  {subscriber.generatedBy.toUpperCase()}
                                </p>
                              </>
                            ) : key === 'Code' ? (
                              <>
                                <p className="text-xs font-semibold">
                                  {subscriber.code}
                                </p>
                                <p className="text-[10px]">
                                  Code Status:{' '}
                                  {subscriber.isUsed ? 'Used' : 'Not Used'}
                                </p>
                              </>
                            ) : key === 'subType' ? (
                              <>
                                <p>Type: {subscriber[key]}</p>
                                <p className="text-[10px]">
                                  Expires At: {subscriber.expiresAt ?? 'N/A'}
                                </p>
                              </>
                            ) : (
                              subscriber[key] || 'N/A'
                            )}
                          </td>
                        ),
                      )}
                      <td className="py-2 px-4 border-b text-sm">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => editSubscription(subscriber)}
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

      {subscriptionInfo && showEditSubscriptionModal && (
        <EditSubscriptionModal
          visible={showEditSubscriptionModal}
          subscriptionInfo={subscriptionInfo}
          onClose={closeEditSubscriptionModal}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default SubscriberListTable
