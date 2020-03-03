export const calculateInterest = loanValue => {
  let interest36 = Number(loanValue) * ((1.04 / 12) * 8.99) // based on 4% orig fee and 8.99% interest rate
  let interest60 = Number(loanValue) * ((1.04 / 12) * 10.99) // based on 4% orig fee and 10.99 interest rate
  return [interest36, interest60]
}

export const calculateTotalPayment = (
  loanType,
  nonPaymentPeriod,
  interestPayment,
  monthlyPayment
) => {
  let months = [36, 60]
  let interestPeriod = nonPaymentPeriod
  let payments = []
  if (loanType === "Interest Only") {
    payments[0] =
      interestPayment.payment36 * interestPeriod +
      monthlyPayment.payment36 * months[0]
    payments[1] =
      interestPayment.payment60 * interestPeriod +
      monthlyPayment.payment60 * months[1]
  } else if (loanType === "Immediate Repayment") {
    payments[0] = monthlyPayment.payment36 * months[0]
    payments[1] = monthlyPayment.payment60 * months[1]
  }
  return payments
}

export const calculateMonthlyPayment = (
  loanValue,
  defaultLoanAmount,
  calcInterestFunc = calculateInterest,
  calcTotalFunc
) => {
  const monthlyRate36 = 0.0899 / 12 // 8.99 interest rate for 36 months
  const monthlyRate60 = 0.1099 / 12 // 10.99 interest rate for 60 months
  const borrowedAmount = Number(loanValue) || Number(defaultLoanAmount)
  const totalLoan = Number(borrowedAmount) * 1.04 // based on 4% orignation fee
  let payment36 =
    Number(monthlyRate36 * totalLoan) /
    (1 - 1 / Math.pow(1 + monthlyRate36, 36))
  let payment60 =
    Number(monthlyRate60 * totalLoan) /
    (1 - 1 / Math.pow(1 + monthlyRate60, 60))
  return [payment36, payment60]
  calcInterestFunc()
  calcTotalFunc()
}
