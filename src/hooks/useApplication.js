import { useEffect, useState } from "react"
import { useSchoolData } from "./useSchoolData"

export const useApplication = () => {
  const { edges } = useSchoolData()
  const schoolList = edges
  const [school, setSchool] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [program, setProgram] = useState("")
  const [showSliders, toggleSliders] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showCalculatorText, setShowCalculatorText] = useState(false)
  const [loanUrl, setLoanUrl] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const selectSchool = e => {
    const selectedSchool = schoolList.filter(
      school => school.node.slug === e.target.value
    )
    if (e.target.value !== "default") setSchool(selectedSchool[0]["node"])
    if (e.target.value === "default") setSchool("")
    setShowCalculatorText(false)
  }

  const selectProgram = e => {
    const parsedObj = JSON.parse(e.target.value)
    setLoanUrl(parsedObj["segment"])
    const selectedProgram = school.schoolInfo.loanInfo.filter(
      program => program.name === parsedObj["name"]
    )
    setProgram(selectedProgram[0])
    toggleSliders(true)
    setShowCalculatorText(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setShowThankYou(true)
    window.open(loanUrl)
  }

  useEffect(() => {
    if (school) {
      setLoanUrl(school["schoolInfo"]["loanInfo"][0]["segment"])
      setSchoolName(school["schoolInfo"]["basicInfo"]["schoolname"])
      setShowCalculator(false)
    }
  }, [school])

  return [
    schoolName,
    setSchoolName,
    showCalculator,
    setShowCalculator,
    showCalculatorText,
    showThankYou,
    selectSchool,
    selectProgram,
    handleSubmit,
    schoolList,
    school,
    loanUrl,
    program,
    showSliders,
    toggleSliders,
  ]
}
