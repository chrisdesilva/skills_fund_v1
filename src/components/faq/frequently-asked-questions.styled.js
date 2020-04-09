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
