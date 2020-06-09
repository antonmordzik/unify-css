import fs, { PathLike, Stats } from 'fs';
import { extname, resolve } from 'path';

const resolvePath = (
  path: string,
  result: { files: string[] } = { files: [] }
  ): void => {
  const dirEntries: PathLike[] = fs.readdirSync(path);

  for (const element of dirEntries) {
    const fullPath = resolve(path, element.toString());
    const stats: Stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      resolvePath(fullPath, result);
    }
    if (stats.isFile()) {
      const ext = extname(element.toString());
      if (ext === '.css') {
        console.log(`Found ${fullPath}`);
        result.files.push(fullPath);
      }
    }
  }
}

const resolveOneDir = (path: string): string[] => {
  const dirEntries: PathLike[] = fs.readdirSync(path);
  const result: string[] = [];

  for (const element of dirEntries) {
    const fullPath = resolve(path, element.toString());
    const stats: Stats = fs.lstatSync(fullPath);
    if (stats.isFile()) {
      result.push(fullPath);
    }
  }

  return result;
}

export const resolvePaths = (paths: string[]): string[] => {
  const info: { files: string[] } = { files: [] };

  for (const path of paths) {
    if (path.includes('**')) {
      resolvePath(path.split('**')[0], info);
    } else {
      info.files = [...info.files, ...resolveOneDir(path)]
    }
  }

  return info.files;
}