import { AbsoluteFill, Img } from 'remotion';
// import { LofiLogo } from './Components/LofiLogo';
import { Background } from './Components/Background';
import { LofiContentSchema } from './Schema/props.schema';
import { LogoText } from './LogoText';
import { Title } from './Components/LofiTitle';
import { Subtitle } from './Components/LofiSubtitle';

// @ts-ignore
import thumbGirl from '../../assets/thumb-girl-2.png';

export const Thumbnail: React.FC<LofiContentSchema> = ({
    content: LofiSchema,
}) => {
    const { backgroundPath, title, subtitle } = LofiSchema;

    return (
        <AbsoluteFill className="bg-gray-100 justify-center items-center">
            <Background backgroundPath={backgroundPath} />

            <AbsoluteFill>
                <div style={{ position: 'absolute', bottom: 0, right: 10 }}>
                    <Img src={thumbGirl} width={800} />
                </div>
            </AbsoluteFill>

            <AbsoluteFill>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div
                        className="w-1/2 flex flex-col justify-center items-center mt-4"
                        style={{ transform: 'translateY(100px)' }}
                    >
                        <Title titleText={title} titleColor={'#fe2858'} />
                        <Subtitle text={subtitle} color={'#2af0ea'} />
                    </div>
                </div>
            </AbsoluteFill>

            <AbsoluteFill>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div
                        className="font-bold"
                        style={{
                            color: '#ffbf00',
                            fontSize: 42,
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
