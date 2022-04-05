import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { Config } from '../config';

export class FS {
  constructor(private readonly config: Config) {}

  // TODO: simplify double-mapping
  public readFiles(): Record<string, string> {
    return Object.fromEntries(
      this.config.sources
        .flatMap((source) => glob.sync(path.resolve(process.cwd(), source)))
        .map((pathname) => [pathname, fs.readFileSync(pathname).toString()]),
    );
  }

  public saveFile(content: string): void {
    fs.writeFileSync(path.resolve(process.cwd(), this.config.output), content);
  }
}
