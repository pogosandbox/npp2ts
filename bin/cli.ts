#!/usr/bin/env node

import {npp2ts} from '../npp2ts';
const wf = require('writefile');

const argv = require('yargs')
  .usage('Usage: $0 <cmd> [args]')
  .alias('f', 'file')
  .alias('o', 'out')
  .nargs({f: 1})
  .describe('f', 'Input file model generated by https://github.com/dcodeIO/ProtoBuf.js/wiki/pbjs')
  .describe('o', 'Output file with definitions. If not provided the buffer will be flushed')
  .demand('f')
  .argv;

try {
  const dts = npp2ts(argv.file);

  if (argv.out) {
    wf(argv.out, dts);
  } else {
    process.stdout.write(dts);
  }
} catch (e) {
  process.stderr.write(`An error occurred: ${e.message}`);
}
