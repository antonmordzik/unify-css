import fs from 'fs';

export const read = (paths: string[]): string[] => paths.map((path) => fs.readFileSync(path).toString());
