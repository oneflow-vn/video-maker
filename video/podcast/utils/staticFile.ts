import { staticFile } from "remotion"


export const staticFileRel = (path: string) => {
    return staticFile(path.substring(path.lastIndexOf('/') + 1));
}