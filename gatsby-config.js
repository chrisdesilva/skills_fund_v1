require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Skills Fund`,
    description: `We provide student loans for the best bootcamps and skills training programs. Skills Fund helps students access a quality education with fixed-rate, simple education financing. Use our loan calculator to know your full payment and terms before you apply.`,
    headline: `Student Loans for Bootcamps - Skills Fund: Finance Your Education`,
    author: `@Skills_Fund`,
    siteUrl: `https://skills.fund`,
    siteLanguage: `en`,
    logo: `src/images/skillsFund_logo.png`,
    favicon: `src/images/Favicon-SF.png`,
    keywords: `student loan, education financing, education loans, coding bootcamp funding, student lending, bootcamp lenders, best bootcamps, best online programs, best coding programs, best data science programs, best cybersecurity programs, best UX/UI programs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        host: "preview.contentful.com",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./data/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout/BlogLayout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {},
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Poppins:400,700", "Poppins:bold"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/Favicon-SF.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-remark`,
  ],
}
