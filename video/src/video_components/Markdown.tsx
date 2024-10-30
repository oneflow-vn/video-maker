import { CSSProperties } from "react";
import AnimationEffect from "./AnimationEffect";
import MarkdownIt from 'markdown-it';
import { useAnimationContext } from "../hooks/useAnimationContext";

export const Markdown: React.FC<{actor: string, md: string | Record<string, string>, style?: CSSProperties}> = ({actor, md, style}) => {
  const language = useAnimationContext().getLanguage();
  const { textEdits } = useAnimationContext().getTextTransformation(actor);
  const markdown = (typeof md === 'string') ? md : md[language];
  const { text: currentMarkdown } = textEdits.edit(markdown);


  return (
			<AnimationEffect actor={actor} style={{color: "white", ...style}}>
        <span style={{
          display: 'block',
      }}
        
        // eslint-disable-next-line react/jsx-sort-props, react/no-danger
        dangerouslySetInnerHTML={{__html: new MarkdownIt().render(currentMarkdown)}}
      />
	
      </AnimationEffect>
  );
};
