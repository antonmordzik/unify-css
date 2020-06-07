#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const cli = new Command();

cli.version('0.0.1');
console.log(chalk.red('Unify CSS started'));

cli
  .option('-C, --config-path <path>', 'path to .uniconfig')
  .option('-S, --source <path>', 'path to source dir')
  .option('-O, --output <path>', 'path to output dir')
  .option('-P, --plugin <path>', 'path to js plugin file')
  .parse(process.argv);

console.log('config-path:', cli.configPath);
console.log('source:', cli.source);
console.log('output:', cli.output);
console.log('plugin:', cli.plugin);