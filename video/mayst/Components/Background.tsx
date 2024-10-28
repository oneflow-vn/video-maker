import { Img, staticFile } from 'remotion';

export const Background: React.FC<{ backgroundPath: string }> = ({
    backgroundPath: backgroundPath,
}) => {
    const flip = {
        transform: 'scaleX(-1)',
    };

    return (
        <div style={{ width: '100%', height: '100%', filter: 'brightness(90%)' }}>
            <Img
                style={{
                    objectFit: 'fill',
                    width: '100%',
                    height: '100%',
                    ...flip,
                }}
                src={staticFile(backgroundPath)}
            />
        </div>
    );
};
