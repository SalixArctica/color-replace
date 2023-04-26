import { findBestMatch } from './lib/diffing.js';
import { rgbaRegex } from './lib/regex.js';
import { setupLogFile } from './lib/utils.js';
import replace from 'replace-in-file';
import { parseColorToChannels, parseRgbaToChannels, rgbaToRgb } from './lib/parse.js';

const cssVarRegex = /var\(--mux-colors-([A-z0-9\-]*)\)/g


setupLogFile();

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.scss',
  ignore: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/styles/_colors.scss',
  from: cssVarRegex,
  to: (match, _, _2, file) => {
    
    const sub = match.substr('var(--mux-colors-'.length);
    const replacement = sub.substr(0, sub.length - 1);

    console.log(replacement);

    return '$' + replacement;
  },
};

replace.sync(options);
