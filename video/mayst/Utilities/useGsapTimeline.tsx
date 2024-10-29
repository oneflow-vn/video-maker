import gsap from 'gsap';
import React, { useContext, useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const useGsapTimeline = <T extends HTMLDivElement>(
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
    }, [frame, fps, timelineRef]);

    return [animationScopeRef, timelineRef] as const;
};

const AnimationContext = React.createContext<gsap.core.Timeline | null>(null);

type AnimationProviderProps = {
    timeline?: gsap.core.Timeline;
    children: React.ReactNode;
};

export const AnimationPovider: React.FC<AnimationProviderProps> = ({
    children,
}) => {
    const [containerRef, timelineRef] = useGsapTimeline(() => {
        return gsap.timeline();
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <AnimationContext.Provider value={timelineRef.current || null}>
                {children}
            </AnimationContext.Provider>
        </div>
    );
};

export function useAnimation(
    callback?: (timeline: gsap.core.Timeline) => void,
    deps?: any[],
) {
    const timeline = useContext(AnimationContext);

    useEffect(() => {
        if (!timeline) return;

        const animation = callback?.(timeline);

        if (!animation) return;

        console.log('animation: ', animation);

        timeline.add(animation);
    }, deps);

    return timeline;
}
