import { useState, useEffect } from "react"

export const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false)

  const handleDownKey = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const handleUpKey = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleDownKey)
    document.addEventListener("keyup", handleUpKey)

    return () => {
      document.removeEventListener("keydown", handleDownKey)
      document.removeEventListener("keyup", handleUpKey)
    }
  })
  return keyPressed
}
