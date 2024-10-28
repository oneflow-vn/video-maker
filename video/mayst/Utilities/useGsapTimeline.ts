import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const useGsapTimeline = <T extends HTMLElement>(
    gsapTimelineFactory: () => gsap.core.Timeline,
) => {
    const animationScopeRef = useRef<T>(null);
    const timelineRef = useRef<gsap.core.Timeline>();
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    useEffect(() => {
        const ctx = gsap.context(() => {
            timelineRef.current = gsapTimelineFactory();
            timelineRef.current.pause();
        }, animationScopeRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.seek(frame / fps);
        }
    }, [frame, fps]);

    return animationScopeRef;
};
