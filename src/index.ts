#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { resolvePaths } from './utils/resolver';
import { readFiles } from './utils/reader';
const cli = new Command();
const failText = 'Running unify-css ' + chalk.red('failed');

cli.version('0.0.1');
console.log(chalk.green('Unify CSS started'));

cli
  .option('-C, --config-path <path>', 'path to .uniconfig')
  .option('-S, --source <path>', 'path to source dir')
  .option('-O, --output <path>', 'path to output dir')
  .option('-P, --plugin <path>', 'path to js plugin file')
  .parse(process.argv);

const configPath = path.resolve(process.cwd(), cli.configPath || './', '.uniconfig')
interface IConfig {
  sources: string[];
  output: string;
}
let config: IConfig;
try {
  const configFile = fs.readFileSync(configPath).toString();
  config = JSON.parse(configFile);
} catch (jsonParseError) {
  console.log(chalk.red(`Cannot read '${configPath}'`));
  console.log(failText);
  process.exitCode = 1;
  process.exit();
}

if (!Array.isArray(config.sources) || !config.sources.every(source => typeof source === 'string')) {
  console.log(chalk.red('Incorrect format of sources.') + ' Use string[] notation.')
  console.log(failText);
  process.exitCode = 1;
  process.exit();
}

const sources = config.sources.map(source => path.resolve(process.cwd(), source));

const cssPaths = resolvePaths(sources);

const cssFiles = readFiles(cssPaths);