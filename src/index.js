import { swapPalette } from './lib/nameSwapPallete.js';
import { themedRegex, extractDarkRegex, extractLightRegex, extractRedesignLight, extractRedesignDark } from './lib/regex.js';
import { setupLogFile } from './lib/utils.js';
import replace from 'replace-in-file';

setupLogFile();

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.tsx',
  ignore: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/styles/_colors.tsx',
  dry: true,
  from: themedRegex,
  to: (match, _, _2) => {

    const darkValue = match.match(extractDarkRegex)?.[1];
    const lightValue = match.match(extractLightRegex)?.[1];
    const reDarkValue = match.match(extractRedesignDark)?.[1];
    const reLightValue = match.match(extractRedesignDark)?.[1];

    const backupLight = lightValue?.includes('new') ? lightValue : swapPalette[lightValue] || lightValue;
    const backupDark = darkValue?.includes('new') ? darkValue : swapPalette[darkValue] || darkValue;

    const goalLight = reLightValue || backupLight;


    const goalDark = reDarkValue || backupDark;

    const replacement = `themed(colors, {
      light: '${goalLight}',
      dark: '${goalDark}'
    })`

    console.log(`${lightValue} to ${goalLight}`);
    console.log(`${darkValue} to ${goalDark}`);


    return replacement;
  },
};

replace.sync(options);