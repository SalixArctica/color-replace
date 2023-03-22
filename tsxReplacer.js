import { findBestMatch, hexCodeToNum } from './utils.js';
import replace from 'replace-in-file';
import colors from './colors.js';



const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/components/InternalBanners/Banner.tsx',
  from: /\#[0-9a-fA-F]+/g,
  to: (match, file) => {



    const replacer = findBestMatch(colors, match)

    return '${' + 'colors.' + replacer.name + '}';
  },
};

replace.sync(options);
