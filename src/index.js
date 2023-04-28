import { swapPalette } from './lib/nameSwapPallete.js';
import { scssVarRegex } from './lib/regex.js';
import { kebabToCamelCase, setupLogFile } from './lib/utils.js';
import replace from 'replace-in-file';

setupLogFile();

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/**/*.scss',
  dry: false,
  from: scssVarRegex,
  to: (match) => {

    const dropDollar = match.substr(1);

    const camelCase = kebabToCamelCase(dropDollar);

    const swap = swapPalette[camelCase];

    const replacement = swap ? '$' + swap : match;
    
    console.log(`${match} to ${replacement || 'unchanged'}`);

    return replacement;
  },
};

replace.sync(options);