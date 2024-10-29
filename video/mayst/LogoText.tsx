import React from 'react';
import { loadFont } from "@remotion/fonts";

// @ts-ignore
import OoohBaby from '../../assets/OoohBaby-Regular.ttf';

const fontFamily = "OoohBaby";

loadFont({
    family: fontFamily,
    url: OoohBaby,
    weight: "500",
}).then(() => {
    console.log("Font loaded!");
});

export const LogoText: React.FC = () => {
    return (

        <div style={{
            fontFamily: 'OoohBaby',
            position: 'fixed',
            top: '50px',
            right: '50px',
            fontWeight: 'bold',
            textShadow: '0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)'
        }}>
            <span style={{ fontSize: 48, color: 'white' }}>
                Tháng Năm Stories
            </span>
        </div>
    );
};
