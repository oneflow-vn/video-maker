import { z } from 'zod';
import { Background } from '../Components/Background';
import { title } from 'process';

export const lofiAudioDataSchema = z.object({
    path: z.string(),
    durationFrames: z.number(),
});

export const lofiImageDataSchema = z.object({
    path: z.string(),
    duration: z.number(),
    durationFrames: z.number(),
});

export const lofiSectionSchema = z.object({
    subtitle: z.string(),
    type: z.enum(['Pomodoro', 'Break', 'chapter']),
    bgm: lofiAudioDataSchema,
    startVoice: lofiAudioDataSchema.nullish(),
    endVoice: lofiAudioDataSchema.nullish(),
    durationFrames: z.number(),
    index: z.number().nullish(),
    background: lofiImageDataSchema.nullish(),
});

export const lofiSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    totalHours: z.number(),
    sections: z.array(lofiSectionSchema),
    backgroundPath: z.string(),
    duration: z.number(),
    backgrounds: z.array(lofiImageDataSchema),
});

export const lofiContentSchema = z.object({
    content: lofiSchema,
    destination: z.string(),
    durationInFrames: z.number(),
});

export type LofiContentSchema = z.infer<typeof lofiContentSchema>;
export type LofiSchema = z.infer<typeof lofiSchema>;
export type LofiSectionSchema = z.infer<typeof lofiSectionSchema>;
export type LofiAudioDataSchema = z.infer<typeof lofiAudioDataSchema>;
