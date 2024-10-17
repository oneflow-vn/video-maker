import Segment from './Segments';

export type ContentSectionVoice = {
    path: string;
    durationFrames: number;
};

export type ContentSection = {
    sectionDurationFrames: number;
    bgm: ContentSectionVoice;
    type: string;
    startVoice: ContentSectionVoice;
    endVoice: ContentSectionVoice;
    index: number;
};

export default interface InterfaceJsonContent {
    timestamp: number;
    width: number;
    height: number;
    intro?: { text: string; url?: string; shortLink?: string };
    end?: { text: string; url?: string; shortLink?: string };
    news: { text: string; url?: string; shortLink?: string }[];
    chapters: { text: string; image?: string }[];
    sections?: ContentSection[];
    fps: number;
    title: string;
    thumbnail_text?: string;
    thumbnail_image_src?: string;
    duration?: number;
    date: string;
    renderData?: {
        text: string;
        duration: number;
        audioFilePath: string;
        segments: Segment[];
        backgroundImage?: string;
        backgroundVideo?: string;
        backgroundGif?: string;
    }[];
    youtube?: {
        viewCount: string;
        subscriberCount: string;
        videoCount: string;
    };
}
