import { findBestMatch, setupLogFile } from './utils.js';
import replace from 'replace-in-file';

setupLogFile();

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/_colors.scss',
  ignore: '/**/*.spec.tsx',
  from: /\#[0-9a-fA-F]{3,6}/g,
  to: (foundHex, _, _2, file) => {
    const replacer = findBestMatch(foundHex)

    const replacementLine = '${' + 'colors.' + replacer.name + '}';

    console.log(`replacing ${foundHex} with ${replacer.color} formatted as ${replacementLine} in ${file.substring('/home/salix/Code/mux/mux-web/packages/dashboard-client/src'.length)}`);

    return replacementLine;
  },
};

replace.sync(options);

