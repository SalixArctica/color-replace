import themeColors from './colors.js'
import { unlinkSync, createWriteStream } from 'fs';
import util from 'util';


export const camelCaseToKebabCase = (string) => {
  const pass1 =  string.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase();
  })

  return pass1.replace(/[A-z][0-9]/g, (match) => {
    return match[0] + '-' + match[1];
  })
}

export const kebabToCamelCase = (string) => {
  return string.replace(/-./g, x=>x[1].toUpperCase())
}

export const setupLogFile = () => {
  try {
    unlinkSync('./debug.log');
  } catch (err) {}
  
  const log_file = createWriteStream('./debug.log', {flags : 'w'});
  const log_stdout = process.stdout;

  console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };
}
