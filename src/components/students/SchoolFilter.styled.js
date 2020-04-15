import styled from "styled-components"
import { breakpoint } from "../../utils/breakpoints"

export const FilterContainer = styled.section`
  background: ${({ theme }) =>
    `linear-gradient(white 55%, ${theme.secondaryLight} 0)`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;

  @media ${breakpoint.xl} {
    padding: 0 0 1rem 0;
  }
`

export const FilterCard = styled.div`
  border: 1px solid lightgray;
  background: white;
  padding: 1rem 1rem 1rem 1rem;
  box-shadow: 1px 1px #c4c4c4, 2px 2px #c4c4c4, 3px 3px #c4c4c4, 4px 4px #c4c4c4;
  width: 90%;

  h3 {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 1rem;

    @media ${breakpoint.md} {
      font-size: 1.5rem;
    }
  }

  .btn--filters {
    width: 8rem;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0 0 1rem;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 0.3em top 55%, 0 0;
    background-size: 0.65em auto, 100%;

    @media ${breakpoint.lg} {
      display: none;
    }
  }

  .hoverUnderline {
    position: relative;
    cursor: pointer;
    display: inline;
    font-size: 0.75rem;

    :after {
      position: absolute;
      bottom: -25%;
      left: 0;
      right: 0;
      margin: auto;
      width: 85%;
      content: ".";
      color: transparent;
      background: black;
      height: 1px;
      transition: width 300ms;
    }
    :hover:after {
      width: 95%;
    }
  }

  .inactive {
    border: 1px solid black;
    background: transparent;
  }

  .active {
    border: 1px solid transparent;
    background: black;
    color: white;
  }

  .filter--search {
    margin: 0 1rem;
    position: relative;

    #search {
      position: relative;
    }

    ul {
      position: absolute;
      padding: 0;
      margin: 0;
      font-size: 0.75rem;
      width: 100%;
      top: 3.25rem;
      z-index: 5;
      li {
        list-style-type: none;
        padding: 0.75rem;
        background: #f7f7f7;
        border-bottom: 1px solid #d9d9d9;
        cursor: pointer;

        &.active {
          background: ${props => props.theme.secondary};
        }
      }
    }
  }
`

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0 1rem 0;
  justify-content: space-around;

  :last-of-type {
    display: none;
    @media ${breakpoint.xl} {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      div {
        display: flex;
        width: 10rem;
        justify-content: space-evenly;
        align-items: center;

        p {
          font-size: 0.75rem;
        }

        svg {
          font-size: 1.5rem;
          cursor: pointer;
          transition: opacity 300ms;
        }

        #cards {
          opacity: ${({ activeView }) => (activeView === "cards" ? "1" : ".5")};
        }

        #list {
          opacity: ${({ activeView }) => (activeView === "list" ? "1" : ".5")};
        }
      }
    }
  }

  .filter--button {
    display: flex;
    justify-content: center;
  }

  .filter--dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 1rem;
    width: 100%;

    select {
      margin-bottom: 0;
    }

    @media ${breakpoint.lg} {
      width: calc(25% - 2rem);
    }
  }

  .clearFilter {
    margin: 0.25rem 0.75rem;
    font-size: 0.6rem;
    display: inline;
    transition: opacity 300ms;
  }

  #categoryFilter {
    opacity: ${({ categoryFilter }) => (categoryFilter ? "1" : "0")};
  }

  #locationFilter {
    opacity: ${({ locationFilter }) => (locationFilter ? "1" : "0")};
  }

  #lengthFilter {
    opacity: ${({ lengthFilter }) => (lengthFilter ? "1" : "0")};
  }

  #scheduleFilter {
    opacity: ${({ scheduleFilter }) => (scheduleFilter ? "1" : "0")};
  }

  label {
    display: flex;
  }
`

export const Filters = styled.div`
  display: ${({ showFilters }) => (showFilters ? "block" : "none")};

  @media ${breakpoint.lg} {
    display: block;
  }
`
