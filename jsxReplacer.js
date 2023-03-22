import { hexCodeToNum } from './utils.js';
import replace from 'replace-in-file';
import colors from './colors.js';

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/components/InternalBanners/Banner.tsx',
  from: /\#[0-9a-fA-F]+/g,
  to: (match, file) => {


    const colorNames = Object.keys(colors);

    const replacer = colorNames.reduce((bestMatch, current) => {
      const diff = Math.abs(hexCodeToNum(match) - hexCodeToNum(colors[current]));

      if(bestMatch === null) {
        return {
          name: current,
          color: colors[current],
          diff
        }
      }

      if(diff < bestMatch?.diff) {

        return {
          name: current,
          color: colors[current],
          diff
        }
      } else {
        return bestMatch;
      }
    }, null);

    return '${' + 'colors.' + replacer.name + '}';
  },
};

replace.sync(options);
