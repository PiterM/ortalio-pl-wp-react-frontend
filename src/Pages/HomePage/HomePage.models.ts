interface FeaturedImage {
    altText: string;
    sourceUrl: string;
}

interface OrtalioMediaItem {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    content?: string;
    soundcloudUrl: string;
    youtubeUrl?: string;
    featuredImage: FeaturedImage;
}

export type OrtalioMedia = OrtalioMediaItem;

interface GlobalDataItem {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    siteTitle: string;
    siteIntro: string;
    siteDescription: string;
}

export type GlobalData = GlobalDataItem;

interface SocialMedia {
    url: string;
    imageAltText: string;
    imageSourceUrl: string;
}

export type SocialMediaData = SocialMedia;