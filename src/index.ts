#!/usr/bin/env node

import { CliOptions, setupCli } from './cli';
import { getConfig } from './config';
import { FS } from './utils/fs';
import { Parser } from './utils/parser';

const run = (options: CliOptions) => {
  const fs = new FS(getConfig(options));
  const files = fs.readFiles();

  new Parser(files).parse();
};

const [options] = setupCli();

run(options);
