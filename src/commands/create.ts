import { Command, Flags } from '@oclif/core';

import { CreateConfig } from '../types';

import {
    BundleVideoService,
    CreateThumbnailService,
    ExportDataService,
    GetContentService,
    GetYoutubeInfoService,
    InstagramUploadService,
    RenderVideoService,
    TextToSpeechService,
    TextToSpeechVettelService,
    YoutubeUploadService,
    GenerateTitleServce,
    GenerateImageService,
    PrepareResourceService,
} from '../services';
import { getLatestFileCreated } from '../utils/getFiles';

export default class Create extends Command {
    static description = 'Create video and upload to destination';

    static examples = ['<%= config.bin %> <%= command.id %> youtube -u -t'];

    static flags = {
        filename: Flags.string({
            char: 'f',
            description: 'filename with content',
        }),
        template: Flags.string({
            char: 't',
            description: 'template to use',
            options: ['podcast', 'lofi'],
            default: 'podcast',
        }),
        needTTS: Flags.boolean({
            char: 's',
            description:
                "need to create TTS. If you haven't created TTS separately (with option tts), you can set this flag to create along the creation of video",
        }),
        render: Flags.boolean({
            char: 'r',
            allowNo: true,
            description: 'should render video',
            default: true,
        }),
        overwrite: Flags.boolean({
            char: 'o',
            description: 'overwrite existing files',
            default: false,
        }),
        upload: Flags.boolean({
            char: 'u',
            description:
                'should upload result to destination (only works to YouTube and Instagram)',
        }),
        onlyUpload: Flags.boolean({
            description:
                'Only upload result to destination (only works to YouTube and Instagram). Your video should be created separately, placed on tmp folder and be the last file created on it.',
        }),
    };

    static args = [
        {
            name: 'option',
            required: true,
            description: 'Format to create content',
            options: ['youtube', 'instagram', 'tts', 'local'],
        },
    ];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(Create);

        switch (args.option) {
            case 'tts':
                await tts(flags);
                break;
            case 'youtube':
                await youtube(flags);
                break;
            case 'instagram':
                await instagram(flags);
                break;
            case 'local':
                await local(flags);
                break;
            default:
                this.error('Invalid option');
        }
    }
}

const tts = async ({ filename }: CreateConfig) => {
    const { content, file } = await new GetContentService().execute(filename);

    const contentWithAudio = await new TextToSpeechService(content).execute({
        synthesizeIntro: true,
        synthesizeEnd: true,
    });

    await new ExportDataService(contentWithAudio).execute(file);
};

const youtube = async ({
    filename,
    needTTS,
    onlyUpload,
    upload,
}: CreateConfig) => {
    let { content, file } = await new GetContentService().execute(
        filename,
        'landscape',
    );

    if (!onlyUpload) {
        if (needTTS) {
            content = await new TextToSpeechService(content).execute({
                synthesizeIntro: true,
                synthesizeEnd: true,
            });
        }

        content = await new GetYoutubeInfoService(content).execute();

        content = await new GenerateTitleServce(content).execute();

        content = await new GenerateImageService(content).execute();

        await new ExportDataService(content).execute(file);

        const bundle = await new BundleVideoService().execute();

        await new RenderVideoService(content).execute(
            bundle,
            'landscape',
            true,
            'youtube',
        );

        await new CreateThumbnailService(content).execute(bundle);
    }

    if (upload || onlyUpload) {
        const videoPath = await getLatestFileCreated('mp4');
        const thumbnailPath = await getLatestFileCreated('jpeg');

        await new YoutubeUploadService(content).execute(
            videoPath,
            thumbnailPath,
        );
    }

    await new ExportDataService(content).execute(file);
};

const instagram = async ({
    filename,
    needTTS,
    onlyUpload,
    upload,
}: CreateConfig) => {
    let { content, file } = await new GetContentService().execute(
        filename,
        'portrait',
    );

    if (!onlyUpload) {
        if (needTTS) {
            content = await new TextToSpeechService(content).execute({
                synthesizeIntro: false,
                synthesizeEnd: false,
            });
        }

        const bundle = await new BundleVideoService().execute();

        await new RenderVideoService(content).execute(
            bundle,
            'portrait',
            false,
            'instagram',
        );

        await new CreateThumbnailService(content).execute(bundle);
    }

    if (upload || onlyUpload) {
        const videoPath = await getLatestFileCreated('mp4');
        const thumbnailPath = await getLatestFileCreated('jpeg');

        await new InstagramUploadService(content).execute(
            videoPath,
            thumbnailPath,
        );
    }

    await new ExportDataService(content).execute(file);
};

const local = async ({
    filename,
    render,
    overwrite,
    template,
}: CreateConfig) => {
    if (!template) {
        throw new Error('Template is required');
    }

    let { content, file } = await new GetContentService().execute(
        filename,
        'landscape',
    );

    if (!content.renderData || overwrite) {
        content = await new GenerateTitleServce(content).execute();

        content = await new TextToSpeechVettelService(content).execute({
            synthesizeIntro: true,
        });

        // content = await new GenerateImageService(content).execute();
    }

    content = await new PrepareResourceService(content).execute();

    const bundle = await new BundleVideoService().execute({ template });

    if (render) {
        await new RenderVideoService(content).execute(
            bundle,
            'landscape',
            true,
            'instagram',
        );
    }

    // await new CreateThumbnailService(content).execute(bundle);

    await new ExportDataService(content).execute(file);

    await new ExportDataService(content).execute(file);
};
