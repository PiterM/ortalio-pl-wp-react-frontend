import gql from 'graphql-tag';
export const GET_ORTALIO_MEDIA_QUERY = gql`
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

export const GET_SOCIAL_MEDIA_DATA_QUERY = gql`
{
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

const GQL_QUERIES = {
  GET_SITE_GLOBAL_DATA_QUERY,
  GET_SOCIAL_MEDIA_DATA_QUERY,
  GET_ORTALIO_MEDIA_QUERY,
};

export default GQL_QUERIES;