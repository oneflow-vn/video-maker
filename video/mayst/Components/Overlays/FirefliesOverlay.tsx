import { AbsoluteFill, useVideoConfig } from "remotion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import { useGsapTimeline } from "../../Utilities/useGsapTimeline";

export const FirefliesOverlay: React.FC = () => {
    const totalParticles = 60;

    const videoConfig = useVideoConfig();

    const containerRef = useGsapTimeline<HTMLDivElement>(() => {
        const w = videoConfig.width;
        const h = videoConfig.height;
        const timeline = gsap.timeline();

        function random(max: number) {
            return Math.random() * max;
        }

        function animateParticle(particle: HTMLElement) {
            timeline.to(particle, {
                duration: random(20) + 10,
                x: random(w),
                y: random(h),
                opacity: random(1),
                scale: random(1) + 0.5,
                delay: random(5),
                onComplete: () => animateParticle(particle),
            });
        }

        const particles = containerRef.current?.children;
        if (particles) {
            Array.from(particles).forEach((particle) => {
                animateParticle(particle as HTMLElement);
            });
        }
        return timeline;
    })

    const particlesElements = useMemo(() => {
        return Array.from({ length: totalParticles }).map((_, index) => {
            const x = Math.random() * videoConfig.width;
            const y = Math.random() * videoConfig.height;

            return (
                <div key={index} className="dot" style={{
                    width: '4px',
                    height: '4px',
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 0px 10px 2px #ffffff',
                    borderRadius: '20px',
                    top: y,
                    left: x,
                    opacity: 0,
                    zIndex: 2,
                }} />
            )
        });
    }, [totalParticles, videoConfig]);

    return (
        <AbsoluteFill>
            <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
                {particlesElements}
            </div>
        </AbsoluteFill>
    );
};
