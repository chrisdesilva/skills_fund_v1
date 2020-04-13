import styled from "styled-components"

export const FAQContainer = styled.div`
  margin-top: 1.5rem;
  a:not(.btn) {
    text-decoration: none;
    color: black;
    transition: background-position 120ms;
    background-image: linear-gradient(
      transparent 0%,
      transparent calc(50% - 9px),
      rgba(255, 164, 161, 0.5) calc(50% - 9px),
      rgba(255, 164, 161, 0.5) 100%
    );
    background-size: 100% 225%;
    background-position: 0px 0px;

    :hover {
      background-image: linear-gradient(
        transparent 0%,
        transparent calc(50% - 9px),
        rgba(233, 105, 101, 1) calc(50% - 9px),
        rgba(233, 105, 101, 1) 100%
      );
      background-position: center center;
    }
  }
`
export const Question = styled.div`
  font-weight: ${({ answerText }) => (answerText ? "bold" : "normal")};
  cursor: pointer;

  svg {
    font-size: 0.8rem;
    transition: transform 300ms, color 300ms;
    transform: ${({ answerText }) =>
      answerText ? "rotate(225deg)" : "rotate(0)"};
    color: ${({ answerText, theme }) =>
      answerText ? theme.secondary : "black"};
  }
`
export const Answer = styled.div`
  transition: max-height 300ms, color 300ms;
  overflow: hidden;
  max-height: ${({ answerText }) => (answerText ? "500px" : "0px")};
`
