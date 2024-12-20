export type CreateConfig = {
    filename?: string;
    template?: string;
    needTTS?: boolean;
    upload?: boolean;
    onlyUpload?: boolean;
    render?: boolean;
    overwrite?: boolean;
    renderThumbnail?: boolean;
    bulk?: boolean;
    clean?: boolean;
};
