import { FeaturedImage } from '../../Pages/HomePage/HomePage.models';

export interface AudioItemState {
    id: string;
    soundcloudUrl: string;
    youtubeUrl?: string;
    title: string;
    shortDescription: string;
    content?: string;
    order: number;
    isPlaying: boolean;
    featuredImage: FeaturedImage;
}
  