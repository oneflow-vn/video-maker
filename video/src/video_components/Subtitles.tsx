import { useAnimationContext } from "../hooks/useAnimationContext";

export const Subtitles: React.FC<{scale?: number}> = ({scale}) => {
  const { subtitle, text} = useAnimationContext().getCurrentSubtitleText();
  if(!subtitle) return <></>;
  const basicSize = 28;
  const size = basicSize * (scale ?? 1) * (subtitle.scale ?? 1);
  const textArray = Array.isArray(text) ? text : [text];
  const style = subtitle.position === 'center' ? {
    top: '50%',
    transform: 'translate(0%, -50%)',
  } : {
    bottom: '0%',
  }

  return (
			<div style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            fontSize: `${size}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
						minHeight: `${size * 1.8}px`,
            ...style,
          }}>
        {textArray.map((item, index) => (
        <span key={index} style={{display: 'block'}}>{item}</span>
      ))}
    </div>
  );
};
