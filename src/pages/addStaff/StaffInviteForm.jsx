import React, { useState } from 'react'
import RolesPermissionsCard from '../settings/RolesPermissionsCard'
import { useCreateStaffMutation } from '../../redux/staffApi'
import { z } from 'zod'

// Define Zod schema for form validation
const staffInviteSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Role is required'), // Add validation for role
})

const StaffInviteForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('') // State for selected role
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [createStaff, { isLoading, isSuccess, isError }] =
    useCreateStaffMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // Reset errors before validation

    // Validate form data with Zod
    const validationResult = staffInviteSchema.safeParse({
      email,
      password,
      username,
      role, // Include role in validation
    })

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format()
      setErrors(fieldErrors)
      return
    }

    try {
      setLoading(true)
      // Call the mutation with form data
      await createStaff({ email, password, username, role }).unwrap()
      setEmail('')
      setPassword('')
      setUsername('')
      setRole('')
      setLoading(false)
      alert('Invite sent successfully!')
    } catch (error) {
      setLoading(false)
      console.error('Failed to send invite:', error)
      alert('Failed to send invite.')
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors?.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username._errors}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email._errors}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password._errors}
              </p>
            )}
          </div>
        </div>

        <div className="mt-14">
          <RolesPermissionsCard
            showExport={false}
            onRoleChange={(role) => setRole(role)} // Pass handler to update role
          />
          {errors?.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role._errors}</p>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-imsPurple hover:bg-imsDarkPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsLightPurple"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Invite'}
          </button>
          <button
            type="reset"
            disabled={loading}
            className="disabled:cursor-not-allowed inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsLightPurple"
            onClick={() => {
              setEmail('')
              setUsername('')
              setPassword('')
              setRole('') // Reset role as well
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
