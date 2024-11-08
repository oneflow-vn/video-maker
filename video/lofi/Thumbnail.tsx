import { AbsoluteFill, Img, getInputProps } from 'remotion';
import { Background } from './Components/Background';
import { LofiContentSchema } from './Schema/props.schema';
import { LogoText } from './LogoText';
import { Title } from './Components/LofiTitle';
import { Subtitle } from './Components/LofiSubtitle';

// @ts-ignore
import thumbGirl from '../../assets/thumb-girl-2.png';

const { content } = getInputProps() as LofiContentSchema;

export const Thumbnail: React.FC<LofiContentSchema> = () => {
    const { backgroundPath, title, subtitle } = content;

    const titleLines = title.split('-');

    const firstLine = titleLines[0];

    const chapter = titleLines.length > 1 ? titleLines[titleLines.length - 1] : '';

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
                <div style={{ position: 'absolute', bottom: 0, right: 10 }}>
                    <Img src={thumbGirl} width={800} />
                </div>
            </AbsoluteFill>

            <AbsoluteFill>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 16,
                            transform: 'translateY(200px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',

                        }}
                    >
                        <Title titleText={firstLine} fontSize={100} titleColor={'#fe2858'} />
                        {chapter && <Title titleText={chapter} fontSize={80} titleColor={'#fe2858'} />}

                        <Subtitle text={subtitle} fontSize={52} color={'#2af0ea'} />
                    </div>
                </div>
            </AbsoluteFill>

            <AbsoluteFill>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 'bold',
                            color: '#ffbf00',
                            fontSize: 48,
                            position: 'absolute',
                            top: 150,
                            right: 200,
                        }}
                    >
                        Truyện Khoa Học Viễn Tưởng Hay Nhất
                    </div>
                </div>
            </AbsoluteFill>

            <LogoText />
        </AbsoluteFill>
    );
};
