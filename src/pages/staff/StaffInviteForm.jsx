import React from 'react'
import RolesPermissionsCard from '../settings/RolesPermissionsCard'

const StaffInviteForm = () => {
  const handleSubmit = () => {
    alert('processing')
  }
  return (
    <div className=" bg-white shadow-lg rounded-lg p-6">
      {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">Invite Staff</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsDarkring-imsDarkPurple sm:text-sm bg-transparent"
              type="password"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="mt-14">
          <RolesPermissionsCard showExport={false} />
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-imsPurple hover:bg-imsDarkPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsLightPurple"
          >
            Send Invite
          </button>
          <button
            type="reset"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsLightPurple"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default StaffInviteForm
