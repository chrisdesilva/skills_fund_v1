import styled from "styled-components"

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  scroll-behavior: smooth;

  h1 {
    text-align: center;
  }

  h2 {
    margin-top: 1rem;
  }
`

export const FAQSection = styled.section`
  margin-top: 3rem;
  position: relative;

  :not(:last-of-type) {
    :after {
      content: "";
      bottom: -1.5rem;
      left: 1rem;
      position: absolute;
      height: 10px;
      width: 200px;
      clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
      background-color: ${({ theme }) => theme.primary};
    }
  }
`
