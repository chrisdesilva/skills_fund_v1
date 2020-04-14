import React from "react"
import styled from "styled-components"

const EditableInput = ({
  onChange,
  value,
  type,
  maxWidth,
  color,
  step = 1,
}) => {
  return (
    <Input
      color={color}
      maxWidth={maxWidth}
      onChange={onChange}
      value={value}
      type={type}
      step={step}
    />
  )
}

export default EditableInput

const Input = styled.input`
  display: inline;
  background: none;
  text-align: center;
  color: ${({ color }) => color};
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 0;
  transition: color 300ms, border-color 300ms;

  :hover {
    color: ${({ theme }) => theme.primaryLight};
    border-color: ${({ theme }) => theme.primaryLight};
  }
`
