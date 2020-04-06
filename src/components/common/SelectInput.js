import React from "react"

const SelectInput = ({ id, defaultValue, onChange, onBlur, options }) => {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
    >
      {defaultValue ? (
        <option disabled value="default">
          ---
        </option>
      ) : null}
      {options}
    </select>
  )
}

export default SelectInput
