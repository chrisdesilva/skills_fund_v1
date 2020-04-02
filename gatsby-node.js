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
    // query for school landing page slug and blog post slugs
    `
      {
        allContentfulSchool {
          nodes {
            slug
          }
        }
        allContentfulBlog {
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

  results.data.allContentfulSchool.nodes.forEach(node => {
    // create school landing pages
    createPage({
      path: `/students/${node.slug}/`,
      component: require.resolve("./src/templates/PartnerPage.js"),
      context: {
        slug: node.slug,
      },
    })
  })

  results.data.allContentfulBlog.edges.forEach(post => {
    // create blog post pages
    createPage({
      path: `/resources/${post.node.slug}`,
      component: require.resolve("./src/templates/BlogPost.js"),
      context: {
        slug: post.node.slug,
      },
    })
  })
}
