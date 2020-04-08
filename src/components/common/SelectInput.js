import React from "react"

const SelectInput = ({
  id,
  defaultValue,
  onChange,
  onBlur,
  options,
  value,
  name,
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {options}
    </select>
  )
}

export default SelectInput
