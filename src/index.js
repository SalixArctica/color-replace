import { swapPalette } from './lib/nameSwapPallete.js';
import { colorTsRegex } from './lib/regex.js';
import { setupLogFile } from './lib/utils.js';
import replace from 'replace-in-file';

setupLogFile();

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.tsx',
  ignore: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/styles/_colors.tsx',
  dry: false,
  from: colorTsRegex,
  to: (match, _, _2) => {
    
    const colorName = match.substr('colors.'.length);

    const replacement = `colors.new.${swapPalette[colorName]}`;

    console.log(`${match} to ${replacement}`);

    return replacement;
  },
};

replace.sync(options);