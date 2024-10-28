import { Img, staticFile } from 'remotion';

import logo from '../../../assets/LofiFocus Timer Logo.png'

export const LofiLogo: React.FC = () => {
    return (
        <div className="fixed top-2 left-2">
            <Img src={logo} />
        </div>
    );
};
