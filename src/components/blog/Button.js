import React from "react"
import { Link } from "gatsby"

const Button = ({ link, text }) => {
  return (
    <Link to={link} className="btn">
      {text}
    </Link>
  )
}

export default Button
