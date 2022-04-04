import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

export type CliOptions = {
  configPath?: string;
  source?: string;
  output?: string;
};

const getVersion = () =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString()).version;

export const setupCli = (): [CliOptions, Command] => {
  const program = new Command();

  program.version(getVersion());

  program
    .option('-C, --config-path <path>', 'path to .uniconfig')
    .option('-S, --source <path>', 'path to source dir')
    .option('-O, --output <path>', 'path to output dir')
    .parse();

  return [program.opts(), program];
};
