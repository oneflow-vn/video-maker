import fs from 'fs';
import path from 'path';

import { log } from '../utils/log';
import { contentPath } from '../config/defaultPaths';
import InterfaceJsonContent from '../models/InterfaceJsonContent';

export default class CreateContentTemplateService {
    private fileType = 'json';

    constructor() {}

    public execute(
        description: string,
        options: { fps?: number; height?: number; width?: number },
    ): void {
        const { fps, height, width } = options;

        const timestamp = Math.round(Date.now() / 1000);

        const newsTemplate = new Array(10).fill({
            text: '',
            url: '',
        });

        const template: InterfaceJsonContent = {
            title: '',
            fps: fps ?? 30,
            height: height ?? 1080,
            width: width ?? 1920,
            timestamp,
            date: new Date().toLocaleDateString('pt-BR'),
            news: [
                {
                    text: `Olá pessoal, A seguir vocês acompanharão as notícias desta ${new Date().toLocaleDateString(
                        'pt-BR',
                        { weekday: 'long' },
                    )}. Na descrição vocês encontram os links para saber mais sobre cada noticia. `,
                },
                ...newsTemplate,
                {
                    text:
                        'Estas notícias foram extraídas da newsletter de Filipe Deschamps. Para acompanhar estas notícias em formato de texto, inscreva-se no link na descrição.',
                    url: 'https://filipedeschamps.com.br/newsletter',
                },
            ],
        };

        const contentFileName = path.resolve(
            contentPath,
            `${timestamp}-${description}.${this.fileType}`,
        );

        fs.writeFileSync(contentFileName, JSON.stringify(template), {
            encoding: 'utf-8',
        });

        log(`Created ${contentFileName}`, 'CreateContentTemplateService');
    }
}
