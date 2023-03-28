import { findBestMatch } from './lib/diffing.js';
import { rgbaRegex } from './lib/regex.js';
import { setupLogFile } from './lib/utils.js';
import replace from 'replace-in-file';
import { parseRgbaToChannels } from './lib/parse.js';



setupLogFile();

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.tsx',
  ignore: '/**/*.spec.tsx',
  dry: true,
  from: rgbaRegex,
  to: (match, _, _2, file) => {
    
    const replacer = findBestMatch(match)

    const replacementLine = '${' + 'colors.' + replacer.name + '}';

    const matchChannels = parseRgbaToChannels(match);

    const rgbNoA = `rgb(${matchChannels.red}, ${matchChannels.green}, ${matchChannels.blue})`

    console.log(`replacing ${rgbNoA} with ${replacer.color} formatted as ${replacementLine}`);

    return replacementLine;
  },
};

replace.sync(options);
