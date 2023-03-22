import { readFileSync, createWriteStream } from 'fs';
import replace from 'replace-in-file';
import { hexCodeDiffPercent, isGrayScale } from './utils.js';
import util from 'util';

const log_file = createWriteStream('./debug.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const getScssColors = () => {
  const scssColorFile = readFileSync('/home/salix/Code/mux/mux-web/packages/dashboard-client/src/styles/variables/_colors.scss', { encoding: 'utf-8'});
  const scssFileLines = scssColorFile.split('\n');

  return scssFileLines.map(line => {
    const name = line.match(/(\$[A-z\-0-9]+)/g);
    const color = line.match(/\#[0-9a-fA-F]+/g);
  
    return name && color ? {name: name[0], color: color[0]}: null;
  }).filter(x => x !== null);
}

const scssColors = getScssColors();

const scssOptions = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.scss',
  ignore: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/styles/variables/_colors.scss',
  from: /\#[0-9a-fA-F]{3,6}/g,
  to: (match, file) => {

    const replacer = scssColors.reduce((bestMatch, current) => {
      const diff = hexCodeDiffPercent(match, current.color);

      if(bestMatch === null) {
        return {
          ...current,
          diff
        }
      }

      if(diff < bestMatch?.diff && isGrayScale(current.color) === isGrayScale(match)) {

        return {
          ...current,
          diff
        }
      } else {
        return bestMatch;
      }
    }, null);

    console.log(`replacing ${match} with ${replacer.color}`);

    return replacer.name;
  },
};

replace.sync(scssOptions);

