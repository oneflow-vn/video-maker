import { AbsoluteFill, OffthreadVideo, Img, useVideoConfig } from 'remotion';
import { Gif } from '@remotion/gif';
import { staticFileRel } from '../utils/staticFile';

type BackgroundProps = {
    image?: string;
    video?: string;
    gif?: string;
};

export const Background = ({ image, video, gif }: BackgroundProps) => {
    const {width, height} = useVideoConfig();
    const videoSrc = video ? staticFileRel(video) : undefined;
    const imageSrc = image ? staticFileRel(image) : undefined;
    const gifSrc = gif ? staticFileRel(gif) : undefined;

    return (
        <AbsoluteFill>
            {videoSrc && (
                <AbsoluteFill>
                    <OffthreadVideo src={videoSrc} />
                </AbsoluteFill>
            )}
            {gifSrc && (
                <AbsoluteFill>
                    <Gif src={gifSrc} loopBehavior='loop' width={width} height={height} />
                </AbsoluteFill>
            )}
            {imageSrc && (
                <AbsoluteFill>
                    <Img src={imageSrc} />
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
