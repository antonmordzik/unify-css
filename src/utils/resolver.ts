import { resolve as _resolve } from 'path';
import glob from 'glob';

export const resolve = (paths: string[]): string[] =>
  paths.flatMap((source) => glob.sync(_resolve(process.cwd(), source)));
