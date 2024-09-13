import React from 'react'

function SelectOptions({
  options,
  displayedRange,
  name,
  id,
  className,
  onChange,
  selectedOption,
}) {
  return (
    <select
      value={selectedOption}
      onChange={onChange}
      name={name}
      id={id}
      className={className}
    >
      {displayedRange && <option value="">{displayedRange}</option>}
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default SelectOptions
