import gql from 'graphql-tag';
export const GET_ORTALO_FULL_DATA_QUERY = gql`
{
    data @client
    ortalioMedia(first:100) {
      edges {
        node {
          id
          slug
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
            sourceUrl(size: THUMBNAIL)
          }
        }
      }
    }
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
    socialMediaData @client
    ortalioSocialMedia(first:20) {
      edges {
        node {
          ortalioSocialMediaField {
            url
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