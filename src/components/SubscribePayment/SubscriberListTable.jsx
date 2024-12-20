import React, { useState } from 'react'
import { useGetRequestDemoQuery } from '../../redux/requestDemoApi'
import EditSubscriptionModal from '../modals/EditSubscriptionModal'

const SubscriptionTableSkeleton = () => (
  <div className="animate-pulse">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-10 bg-gray-200 rounded mb-4" />
    ))}
  </div>
)

const SubscriberListTable = () => {
  const [subscriptionInfo, setStaffInfo] = useState(null)
  const [showEditSubscriptionModal, setShowEditStaffModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Page state for pagination
  const pageSize = 10 // Set page size

  const {
    data: subscriberData,
    isLoading,
    error: subscriberDataError,
    refetch,
  } = useGetRequestDemoQuery({ page: currentPage, limit: pageSize })

  console.log({ subscriberData })

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

  const totalPages = subscriberData?.pagination?.totalPages || 1

  return (
    <div className="py-5 bg-white">
      {/* {JSON.stringify(subscriptionInfo)} */}
      <div className="container mx-auto md:p-4">
        {isLoading || subscriberDataError ? (
          <SubscriptionTableSkeleton />
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
                      No subscription history yet.
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
