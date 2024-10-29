import {
    AbsoluteFill,
    random,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMemo, useRef } from 'react';
import { useGsapTimeline } from '../../Utilities/useGsapTimeline';

export const FirefliesOverlay: React.FC = () => {
    const totalParticles = 50;
    const frame = useCurrentFrame();

    const videoConfig = useVideoConfig();

    const containerRef = useGsapTimeline<HTMLDivElement>(() => {
        const w = videoConfig.width;
        const h = videoConfig.height;
        const timeline = gsap.timeline();

        function animateParticle(particle: HTMLElement, seed: number) {
            const x0 = random(seed -1) * w;
            const y0 = random(seed -2) * h;
            const opacity0 = random(seed -3);
            const scale0 = random(seed -4) + 0.5;

            const x = random(seed + 1) * w;
            const y = random(seed + 2) * h;
            const duration = random(seed + 3) * 20 + 10;
            const scale = random(seed + 4) + 0.5;
            const delay = random(seed + 5) * 5;
            const opacity = random(seed + 6);

            gsap.set(particle, {
                x: x0,
                y: y0,
                scale: scale0,
                opacity: opacity0,
            })

            const animation = gsap
                .to(particle, {
                    duration,
                    x,
                    y,
                    opacity,
                    scale,
                    delay,
                });

            timeline.add(animation, 0);
        }

        const particles = containerRef.current?.children;
        if (particles) {
            Array.from(particles).forEach((particle, index) => {
                animateParticle(particle as HTMLElement, frame * index * 100);
            });
        }
        return timeline;
    });

    const particlesElements = useMemo(() => {
        return Array.from({ length: totalParticles }).map((_, index) => {
            return (
                <div
                    key={index}
                    className="dot"
                    style={{
                        width: '4px',
                        height: '4px',
                        position: 'absolute',
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 0px 10px 2px #ffffff',
                        borderRadius: '20px',
                        opacity: 1,
                        zIndex: 2,
                    }}
                />
            );
        });
    }, [totalParticles, videoConfig]);

    return (
        <AbsoluteFill>
            <div
                ref={containerRef}
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                {particlesElements}
            </div>
        </AbsoluteFill>
    );
};
