#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { resolvePaths } from './utils/resolver';
import { readFiles } from './utils/reader';
import { process as parseProcess, IDeclaration } from './utils/parser';

const failText = 'Running unify-css falied.';

program.version('0.0.1');
console.log('Unify CSS started');

program
  .option('-C, --config-path <path>', 'path to .uniconfig')
  .option('-S, --source <path>', 'path to source dir')
  .option('-O, --output <path>', 'path to output dir')
  .option('-P, --plugin <path>', 'path to js plugin file')
  .parse(process.argv);

const options = program.opts<{
  configPath: string;
  source: string;
  output: string;
  plugin: string;
}>()

const configPath = path.resolve(process.cwd(), options.configPath || './', '.uniconfig');
interface IConfig {
  sources: string[];
  output: string;
}
let config: IConfig;
try {
  const configFile = fs.readFileSync(configPath).toString();
  config = JSON.parse(configFile);
} catch (jsonParseError) {
  console.log(`Cannot read '${configPath}'`);
  console.log(failText);
  process.exitCode = 1;
  process.exit();
}

if (!Array.isArray(config.sources) || !config.sources.every(source => typeof source === 'string')) {
  console.log('Incorrect format of sources. Use string[] notation.')
  console.log(failText);
  process.exitCode = 1;
  process.exit();
}

const sources = config.sources.map(source => path.resolve(process.cwd(), source));

const cssPaths = resolvePaths(sources);

const cssFiles = readFiles(cssPaths);

const declarations: IDeclaration[][] = cssFiles.map(file => parseProcess(file));
