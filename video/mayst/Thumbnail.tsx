import { AbsoluteFill, Img, getInputProps } from 'remotion';
import { Background } from './Components/Background';
import { LofiContentSchema } from './Schema/props.schema';
import { LogoText } from './LogoText';
import { Title } from './Components/LofiTitle';
import { Subtitle } from './Components/LofiSubtitle';

import './style.css';

const { content } = getInputProps() as LofiContentSchema;

export const Thumbnail: React.FC<LofiContentSchema> = () => {
    const { backgroundPath, title, subtitle } = content;

    const blur = {
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    }

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#f3f4f6',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                margin: 0,
            }}
        >
            <Background backgroundPath={backgroundPath} />

            <AbsoluteFill>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <div style={blur} >lll</div>
                    <div
                        className="thumbail-title"
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 16,
                            transform: 'translateY(-100px)',
                        }}
                    >
                        <Title titleText={title} titleColor={'black'} />
                        <Subtitle text={subtitle} color={'#a8076e'} />
                    </div>
                </div>
            </AbsoluteFill>

            <LogoText />
        </AbsoluteFill>
    );
};
