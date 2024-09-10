import React, { useState } from 'react'

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

const permissions = [
  { label: 'Store' },
  { label: 'Products' },
  { label: 'Users' },
  { label: 'Settings' },
  { label: 'Sales Records' },
  { label: 'Accounts' },
]

const SelectPermission = () => {
  // State to track the toggle switch values
  const [toggleState, setToggleState] = useState(
    Array(6).fill(Array(4).fill(false)), // 5 rows, 4 toggle columns
  )

  // Handle the toggle switch change
  const handleToggleChange = (rowIndex, colIndex) => {
    const newToggleState = toggleState.map((row, i) =>
      i === rowIndex ? row.map((col, j) => (j === colIndex ? !col : col)) : row,
    )
    setToggleState(newToggleState)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
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
          {permissions.map(({ label }, rowIndex) => (
            <tr key={rowIndex}>
              {/* Text in the first columpermissions */}
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {label}
              </td>
              {/* Toggle switches in the rest of the columns */}
              {[1, 2, 3, 4].map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-center">
                  <ToggleSwitch
                    isOn={toggleState[rowIndex][colIndex]}
                    handleToggle={() => handleToggleChange(rowIndex, colIndex)}
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
