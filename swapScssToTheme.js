import { setupLogFile, camelCaseToKebabCase } from './utils.js';
import replace from 'replace-in-file';
import replacementMap from './replacements.js';

setupLogFile();

const findScssVarNamesRegex = /\$((?!--)[A-z0-9-])*[, ;]/g;

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/*.scss',
  ignore: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/_colors.scss',
  dry: true,
  from: findScssVarNamesRegex,
  to: (unTrimmedMatch) => {

    const match = unTrimmedMatch.slice(0, -1);
    const replacer = replacementMap[match];

    replacer ? console.log(`replacing ${match} with ${replacer}`) : console.log(`no match for ${match}`);

    return '$' + camelCaseToKebabCase(replacer) || unTrimmedMatch;
  },
};

replace.sync(options);

