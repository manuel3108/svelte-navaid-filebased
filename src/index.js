#!/usr/bin/env node

const sade = require('sade');
const generate = require('./generate') 
 
sade('genrate [dir]', true)
  .version('1.0.0')
  .describe('Run a static file server')
  .option('-d, --dir', 'the location of the routes directory', 'src/routes/')
  .option('-b, --basepath', 'the location of the routes directory', '')
  .option('-o, --output', 'the file where the routes should be written to', 'src/Routes.svelte')
  .action(generate)
  .parse(process.argv);