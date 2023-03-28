import { camelCaseToKebabCase, findBestMatch, setupLogFile } from './utils.js';
import replace from 'replace-in-file';
import { writeFileSync } from 'fs';

setupLogFile();
const wholeLineRegex = /\$(.*): (.*);/g;
const scssVarRegex = /\$(.*):/g;
const varNameRegex = /\#[0-9a-fA-F]{3,6}/g


const replacementMap = {};

const options = {
  files: '/home/salix/Code/mux/mux-web/packages/dashboard-client/src/**/_colors.scss',
  ignore: '/**/*.spec.tsx',
  from: wholeLineRegex,
  to: (varLine) => {

    const colorName = varLine.match(scssVarRegex)[0].slice(0, -1);
    const hex = varLine.match(varNameRegex)[0];

    const bestMatch = findBestMatch(hex);

    console.log(`${hex} to ${bestMatch.color} - ${colorName} to ${bestMatch.name}`);
    replacementMap[colorName] = bestMatch.name;

    return `$${camelCaseToKebabCase(bestMatch.name)}: ${bestMatch.color};`;
  },
};

replace.sync(options);

writeFileSync('replacements.json', JSON.stringify(replacementMap));
