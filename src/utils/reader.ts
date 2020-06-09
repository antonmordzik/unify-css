import fs from 'fs';

export const readFiles = (paths: string[]): string[] => {
  const result: string[] = [];
  for (const path of paths) {
    const file = fs.readFileSync(path).toString();
    result.push(file);
  }
  return result;
}
