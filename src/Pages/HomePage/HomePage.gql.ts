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

export const GET_SITE_GLOBAL_DATA_QUERY = gql`
{
    globalData @client
    ortalioSettingBy(slug: "site-global-data") {
      ortalioSettingsField {
        metaDescription
        metaKeywords
        metaTitle
        siteDescription
        siteIntro
        siteTitle
      }
    }
  }
`;