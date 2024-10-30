import styled from 'styled-components'
import React, { CSSProperties } from "react";
import {Highlight, themes} from 'prism-react-renderer';
import AnimationEffect from "./AnimationEffect";
import { useAnimationContext } from "../hooks/useAnimationContext";
import { HighlightStyle } from "../models/Subtitles";

const InsertCursor = styled.span.attrs({
  className: 'insert-cursor',
})`
  display: inline-block;
  width: 0;
  height: 0.9em;
  background-color: blue; /* Set cursor color */
  border: none;
  border-right: 2px solid white; /* Set cursor width and color */
`;

const BlockedCursor = styled.span.attrs({
  className: 'blocked-cursor',
})`
display: inline-block;
filter: invert(1);
width: 1ch; /* Set the width to one character */
height: 1em;
background-color: black; /* This will be overridden by the inline style */
border-right: none; /* Remove the border */
`;



export const CodeHighlight: React.FC<{actor: string, codeString: string, language?: string, style?: CSSProperties, preStyle?: CSSProperties, children?: React.ReactNode}> = ({
  actor, language, style, preStyle, codeString, children}) => {
  const { highlights, textEdits } = useAnimationContext().getTextTransformation(actor);
  const { text: currentCode, cursorLine, cursorColumn, cursor, insertCursor } = textEdits.edit(codeString);

  const lineHighlightStyle = (line: number): HighlightStyle[] => {
    const result: HighlightStyle[] = [];

    highlights.forEach((highlight) => {
      if ('lines' in highlight && highlight.lines.includes(line)) {
        result.push(highlight.style);
      }
    });

    return result;
}

  const tokenHighlightStyle = (token: string): HighlightStyle[] => {
    const result: HighlightStyle[] = [];

    highlights.forEach((highlight) => {
      if ('tokens' in highlight && highlight.tokens.includes(token)) {
        result.push(highlight.style);
      }
    });

    return result;
  }

  const highLightStylesToCSS = (styles: HighlightStyle[]): CSSProperties => {
    return styles.reduce((acc, style) => {
      switch (style) {
        case 'red background':
          return {...acc, background: 'rgba(0, 0, 0, 0.8)', filter: 'invert(1)'};
        case 'wavy underline':
          return {...acc, textDecoration: 'underline wavy red'};
        default:
          return acc;
      }
    }, {} as CSSProperties);
  }

  const lineStyle = (line: number): CSSProperties => highLightStylesToCSS(lineHighlightStyle(line));
  const tokenStyle = (token: string): CSSProperties => highLightStylesToCSS(tokenHighlightStyle(token));
    

  return (
			<AnimationEffect actor={actor} style={{...style}}>
        {children}
        <Highlight code={currentCode} language={language || "tsx"} theme={themes.vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{fontSize: "1.25rem", marginTop: 0, ...style, ...preStyle}}>
                {
                tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });

                  lineProps.style = {
                      ...lineProps.style,
                      ...lineStyle(i + 1),
                    };
                  return <div {...lineProps}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key });
                      tokenProps.style = {
                        ...tokenProps.style,
                        ...tokenStyle(token.content),
                      };


                      if (cursor && i === cursorLine - 1) {
                        const contentBeforeCursor = line.slice(0, key).map((t) => t.content).join('');
                        const contentWithCursor = contentBeforeCursor + token.content;

                        if (
                          (contentBeforeCursor.length <= cursorColumn && contentWithCursor.length >= cursorColumn) || cursorColumn === 0
                        ) {
                          const beforeCursor = token.content.slice(0, cursorColumn - contentBeforeCursor.length);
                          const afterCursor = token.content.slice(cursorColumn - contentBeforeCursor.length);
      
                          return (
                            <React.Fragment key={key}>
                              <span {...tokenProps} key={`${key}-beforeCursor`} style={{ ...tokenProps.style }}>{insertCursor ? beforeCursor : beforeCursor.slice(0, beforeCursor.length - 1)}</span>
                              {insertCursor ? (<InsertCursor key={`${key}-cursor`} />) : (
                              <BlockedCursor key={`${key}-cursor`} style={{ color: tokenProps.style.backgroundColor, backgroundColor: tokenProps.style.color }} >{beforeCursor.at(beforeCursor.length -1) || ' '}</BlockedCursor>
                              )}
                              <span {...tokenProps} key={`${i}-afterCursor`}  style={{ ...tokenProps.style }}>{afterCursor}</span>
                            </React.Fragment>
                          );
                        }
                      }

                      return <span {...tokenProps} />
                    })}
                  </div>;
                })}
              </pre>
            )}
          </Highlight>
      </AnimationEffect>
  );
};
