import React from "react"

const SelectInput = ({
  id,
  defaultValue,
  onChange,
  onBlur,
  options,
  value,
}) => {
  return (
    <select id={id} value={value} onChange={onChange} onBlur={onBlur}>
      {options}
    </select>
  )
}

export default SelectInput
