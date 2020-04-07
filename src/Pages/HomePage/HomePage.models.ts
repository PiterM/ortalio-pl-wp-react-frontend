interface FeaturedImage {
    altText: string;
    sourceUrl: string;
}

interface OrtalioMediaItem {
    title: string;
    shortDescription: string;
    content?: string;
    soundcloudUrl: string;
    youtubeUrl?: string;
    featuredImage: FeaturedImage;
}

export type OrtalioMedia = OrtalioMediaItem;