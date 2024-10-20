import {Img, staticFile} from 'remotion';

export const Background: React.FC<{backgroundPath: string}> = ({
	backgroundPath: backgroundPath,
}) => {
    return (
        <div style={{ width: '100%', height: '100%', filter: 'brightness(90%)' }}>
            <Img
                style={{ objectFit: 'fill', width: '100%', height: '100%' }}
                src={staticFile(backgroundPath)}
            />
        </div>
    );
};
