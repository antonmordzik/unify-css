#!/usr/bin/env node

import { resolve } from './utils/resolver';
import { read } from './utils/reader';
import { CliOptions, setupCli } from './cli';
import { getConfig } from './config';

const run = (options: CliOptions) => {
  const config = getConfig(options);

  const cssPaths = resolve(config.sources);
  const cssFiles = read(cssPaths);

  console.log(cssFiles);
};

const [options] = setupCli();

run(options);
