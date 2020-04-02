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
  const [email, setEmail] = useState("")
  const [submitReady, setSubmitReady] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const selectSchool = e => {
    const selectedSchool = schoolList.filter(
      school => school.node.slug === e.target.value
    )
    setSchool(selectedSchool[0]["node"])
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

  const handleEmail = e => {
    setEmail(e.target.value)
    setSubmitReady(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setEmail("")
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
    email,
    submitReady,
    showThankYou,
    selectSchool,
    selectProgram,
    handleEmail,
    handleSubmit,
    schoolList,
    school,
    loanUrl,
    program,
    showSliders,
    toggleSliders,
  ]
}
