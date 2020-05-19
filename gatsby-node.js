/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({
  actions,
  graphql
}) => {
  const {
    data
  } = await graphql(`
  query MyQuery {
    allS3Image {
      edges {
        node {
          id
          ETag
          Extension
          IsTruncated
          Key
          LastModified
          KeyCount
          MaxKeys
          Name
          Prefix
          StorageClass
          Url
          Size
        }
      }
    }
  }
 `)

  const totalPages = data.allS3Image.edges.length;
  data.allS3Image.edges.sort((a, b) => {
    return parseInt(b.node.Key.split('_')[0]) - parseInt(a.node.Key.split('_')[0])
  }).forEach((item, index) => {

    actions.createPage({
      path: `day/${index+1}`,
      component: require.resolve('./src/templates/photo.js'),
      context: {
        photo: {
          ...item.node,
          totalPages,
          pageNumber: index + 1
        }
      }
    })
  });
}