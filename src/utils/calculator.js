export const calculateInterestPayment = (
  loanValue,
  setInterestPayments,
  interestRate
) => {
  let interest36 =
    Number(loanValue) * ((1.05 / 12) * (interestRate.rate36 / 100)) // based on 5% orig fee
  let interest60 =
    Number(loanValue) * ((1.05 / 12) * (interestRate.rate60 / 100)) // based on 5% orig fee
  setInterestPayments({
    payment36: Number(interest36.toFixed(2)),
    payment60: Number(interest60.toFixed(2)),
  })
}

export const calculateTotalPayment = (
  loanType,
  nonPaymentPeriod,
  interestPayment,
  monthlyPayment,
  setTotalPayments
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
    setTotalPayments({
      payment36: Number(payments[0].toFixed(2)),
      payment60: Number(payments[1].toFixed(2)),
    })
  } else if (loanType === "Immediate Repayment") {
    payments[0] = monthlyPayment.payment36 * months[0]
    payments[1] = monthlyPayment.payment60 * months[1]
    setTotalPayments({
      payment36: Number(payments[0].toFixed(2)),
      payment60: Number(payments[1].toFixed(2)),
    })
  }
}

export const calculateMonthlyPayment = (
  loanValue,
  defaultLoanAmount,
  setMonthlyPayments,
  interestRate
) => {
  const monthlyRate36 = interestRate.rate36 / 100 / 12
  const monthlyRate60 = interestRate.rate60 / 100 / 12
  const borrowedAmount = Number(loanValue) || Number(defaultLoanAmount)
  const totalLoan = Number(borrowedAmount) * 1.05 // based on 5% orignation fee
  let payment36 =
    Number(monthlyRate36 * totalLoan) /
    (1 - 1 / Math.pow(1 + monthlyRate36, 36))
  let payment60 =
    Number(monthlyRate60 * totalLoan) /
    (1 - 1 / Math.pow(1 + monthlyRate60, 60))
  setMonthlyPayments({
    payment36: Number(payment36.toFixed(2)),
    payment60: Number(payment60.toFixed(2)),
  })
}
