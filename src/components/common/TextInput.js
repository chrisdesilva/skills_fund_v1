import React from "react"

const TextInput = ({
  id,
  type,
  name,
  placeholder,
  onChange,
  value,
  required,
  disabled,
  className,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      disabled={disabled}
      className={className}
    />
  )
}

export default TextInput
