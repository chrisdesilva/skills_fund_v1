const path = require(`path`)
const slash = require(`slash`)

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // Hack due to Tailwind ^1.1.0 using `reduce-css-calc` which assumes node
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig()
  config.node = {
    fs: "empty",
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const results = await graphql(
    `
      {
        allSchoolsJson {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )
  if (results.errors) {
    console.log("Error retrieving data", results.errors)
    return
  }
  const partnerPageTemplate = path.resolve("./src/templates/PartnerPage.js")
  // Then for each result we create a page.
  results.data.allSchoolsJson.edges.forEach(edge => {
    createPage({
      path: `/students/${edge.node.slug}/`,
      component: slash(partnerPageTemplate),
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
