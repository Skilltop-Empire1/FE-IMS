import React, { useEffect, useState } from 'react'

// Custom Toggle Switch Component
const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300 ${
        isOn ? 'border border-imsPurple bg-imsPurple/30' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute left-0 h-4 w-4 transform rounded-full shadow transition-transform duration-300 ${
          isOn ? 'translate-x-6 bg-imsPurple' : 'translate-x-1 bg-white'
        }`}
      />
    </div>
  )
}

const initialPermissions = [
  { label: 'Store', view: false, create: false, edit: false, approval: false },
  {
    label: 'Products',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Categories',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  { label: 'Users', view: false, create: false, edit: false, approval: false },
  {
    label: 'Settings',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Sales Records',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Accounts',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
]

const SelectPermission = ({ onPermissionsChange, loadedPermissions }) => {
  const [permissions, setPermissions] = useState(
    loadedPermissions || initialPermissions,
  )

  console.log({ loadedPermissions, permissions })
  const handleToggleChange = (rowIndex, permissionType) => {
    const updatedPermissions = permissions.map((permission, index) => {
      if (index === rowIndex) {
        return {
          ...permission,
          [permissionType]: !permission[permissionType],
        }
      }
      return permission
    })
    setPermissions(updatedPermissions)
    onPermissionsChange(updatedPermissions)
  }
  useEffect(() => {
    if (loadedPermissions) {
      console.log('first')
      setPermissions(loadedPermissions)
    } else {
      setPermissions(initialPermissions)
      console.log('else')
    }
  }, [loadedPermissions])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Create
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Approval
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {permissions.map((permission, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {permission.label}
              </td>
              {['view', 'create', 'edit', 'approval'].map((type) => (
                <td key={type} className="px-4 py-2 text-center">
                  <ToggleSwitch
                    isOn={permission[type]}
                    handleToggle={() => handleToggleChange(rowIndex, type)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SelectPermission
