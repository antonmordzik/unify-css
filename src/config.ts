import fs from 'fs';
import path from 'path';
import { CliOptions } from './cli';

export type Config = {
  sources: string[];
  output: string;
};

const isValidConfig = (config: Config): boolean =>
  Array.isArray(config.sources) && config.sources.every((source) => typeof source === 'string');

// TODO: handle source and output options
export const getConfig = ({ configPath = './' }: CliOptions): Config => {
  const absoluteConfigPath = path.resolve(process.cwd(), configPath, '.uniconfig');

  const config: Config = JSON.parse(fs.readFileSync(absoluteConfigPath).toString());

  if (!isValidConfig(config)) {
    console.log('Incorrect format of sources. Use string[] notation.');
    process.exitCode = 1;
    process.exit();
  }

  return config;
};
