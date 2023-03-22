import { createWriteStream } from 'fs';
import replace from 'replace-in-file';
import { camelCaseToKebabCase, findBestMatch } from './utils.js';
import util from 'util';

const log_file = createWriteStream('./debug.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const scssOptions = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.scss',
  ignore: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/styles/variables/_colors.scss',
  from: /\#[0-9a-fA-F]{3,6}/g,
  dry: true,
  to: (foundHex, a, b, file) => {

    const replacer = findBestMatch(foundHex);

    const varLine = `var(--mux-colors-${camelCaseToKebabCase(replacer.name)})`

    console.log(`replacing ${foundHex} with ${replacer.color} formatted as ${varLine} in ${file.substring('/home/salix/Code/mux/mux-web/packages/dashboard-client/src'.length)}`);

    return varLine;
  },
};

replace.sync(scssOptions);

