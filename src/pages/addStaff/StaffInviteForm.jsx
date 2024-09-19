import React, { useState } from 'react'
import RolesPermissionsCard from '../settings/RolesPermissionsCard'
import { useCreateStaffMutation } from '../../redux/staffApi' // Import the API hook

const StaffInviteForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createStaff, { isLoading, isSuccess, isError }] =
    useCreateStaffMutation() // Destructure mutation hook

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Call the mutation with form data
      await createStaff({ email, password }).unwrap()
      alert('Invite sent successfully!')
    } catch (error) {
      console.error('Failed to send invite:', error)
      alert('Failed to send invite.')
    }
  }

  return (
    <div className=" bg-white shadow-lg rounded-lg p-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind state
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind state
              required
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
            disabled={isLoading} // Disable the button while processing
          >
            {isLoading ? 'Sending...' : 'Send Invite'}
          </button>
          <button
            type="reset"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsLightPurple"
            onClick={() => {
              setEmail('')
              setPassword('')
            }}
          >
            Cancel
          </button>
        </div>

        {isSuccess && (
          <p className="text-green-600 mt-4">Invite sent successfully!</p>
        )}
        {isError && <p className="text-red-600 mt-4">Failed to send invite.</p>}
      </form>
    </div>
  )
}

export default StaffInviteForm
