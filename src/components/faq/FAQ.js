import React, { useState } from "react"
import { FaPlusCircle } from "react-icons/fa"
import { FAQContainer, Question, Answer } from "./FAQ.styled"

const FAQ = ({ question, answer }) => {
  const [answerText, setAnswerText] = useState(false)

  return (
    <FAQContainer>
      <Question
        answerText={answerText}
        onClick={() => setAnswerText(!answerText)}
      >
        {question} <FaPlusCircle />
      </Question>
      <Answer answerText={answerText}>{answer}</Answer>
    </FAQContainer>
  )
}

export default FAQ
