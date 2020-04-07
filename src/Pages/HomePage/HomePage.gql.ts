import gql from 'graphql-tag';
export const GET_ORTALIO_MEDIA_QUERY = gql`
{
    data @client
    ortalioMedia {
      edges {
        node {
          ortalioMediaField {
            title
            content
            fieldGroupName
            shortDescription
            soundcloudUrl
            youtubeUrl
          }
          featuredImage {
            altText
            sourceUrl
          }
        }
      }
    }
} 
`;