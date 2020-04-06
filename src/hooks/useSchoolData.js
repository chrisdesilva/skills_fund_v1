import { useStaticQuery, graphql } from "gatsby"

export const useSchoolData = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSchool(sort: { fields: slug, order: ASC }) {
        edges {
          node {
            logo {
              fluid {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            slug
            schoolInfo {
              basicInfo {
                APRRange36
                APRRange60
                applicationsLive
                disabledLoanAppFormID
                hubspotFormID
                interestRate36
                interestRate60
                locations
                nextCohortStartDate
                programTypes
                schoolcode
                schoolname
                schoolurl
                selectAProgram
                tuitionRange
                programLengths
                weeklySchedules
              }
              paymentTable {
                data {
                  program
                  col
                  max
                  tuition
                }
                headers
                show
              }
              features {
                costOfLiving
                multiLoanLengths
                multiPrograms
                products
              }
              loanInfo {
                aprAndType {
                  info {
                    apr36
                    apr60
                    maxCOL
                    maxTuition
                    type
                  }
                }
                defaultAmount
                hubspotValue
                metros {
                  location
                  max
                }
                multiMetros
                loanLengths
                name
                nonPaymentPeriod
                segment
                queryParams
              }
              id
            }
          }
        }
      }
    }
  `)
  return data.allContentfulSchool
}
