import { useEffect, useState } from "react"
import { useSchoolData } from "./useSchoolData"

export const useApplication = () => {
  const { edges } = useSchoolData()
  const schoolList = edges
  const [school, setSchool] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [showCalculator, setShowCalculator] = useState(false)
  const [showCalculatorText, setShowCalculatorText] = useState(false)
  const [loanUrl, setLoanUrl] = useState(false)
  const [email, setEmail] = useState("")
  const [submitReady, setSubmitReady] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const selectSchool = e => {
    setShowCalculatorText(true)
    const selectedSchool = schoolList.filter(
      school => school.node.slug === e.target.value
    )
    setSchool(selectedSchool[0]["node"])
  }

  const selectProgram = e => {
    setLoanUrl(e.target.value)
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
    if (school["loanInfo"]) {
      setLoanUrl(school["loanInfo"][0]["segment"])
      setSchoolName(school["basicInfo"]["schoolname"])
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
  ]
}
