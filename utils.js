import themeColors from './colors.js'
import { unlinkSync, createWriteStream } from 'fs';
import util from 'util';

const hexToNum = (hex) => {
  return parseInt(hex, 16);
}

export const hexCodeDiffPercent = (hexCode1, hexCode2) => {

  const hex1Channels = parseHexCodeToChannels(hexCode1);
  const hex2Channels = parseHexCodeToChannels(hexCode2);

  const redDiff = Math.abs(hex1Channels.red - hex2Channels.red);
  const greenDiff = Math.abs(hex1Channels.green - hex2Channels.green);
  const blueDiff = Math.abs(hex1Channels.blue - hex2Channels.blue);

  const compositeDiff = (redDiff + greenDiff + blueDiff) / 3;
  
  return compositeDiff;
}

export const parseHexCodeToChannels = (hexCode) => {

  // drop the # 
  let hex = hexCode.substring(1);

  // double up shortened codes
  hex = hex.length === 3 ? hex + hex : hex;

  const red = hexToNum(hex.substring(0, 2));

  const green = hexToNum(hex.substring(2,4));

  const blue = hexToNum(hex.substring(4));

  return { red, green, blue };
}

export const isGrayScale = (hexCode) => {

  const channels = parseHexCodeToChannels(hexCode);
  const rgDiff = Math.abs(channels.red - channels.green);
  const rbDiff = Math.abs(channels.red - channels.blue);
  const gbDiff = Math.abs(channels.green - channels.blue);

  // about the sweet spot that allows for slightly bright colors and slightly off greys 
  return rgDiff < 5 && rbDiff < 5 && gbDiff < 5;
}

export const findBestMatch = (color) => {
  const colorPool = Object.keys(themeColors).map(name => ({name, color: themeColors[name]}))

  return colorPool.reduce((bestMatch, current) => {
    const diff = hexCodeDiffPercent(color, current.color);


    if(bestMatch === null) {
      return {
        ...current,
        diff
      }
    }

    if(diff < bestMatch.diff && isGrayScale(current.color) === isGrayScale(color)) {

      return {
        ...current,
        diff
      }
    } else {
      return bestMatch;
    }
  }, null)
}

export const camelCaseToKebabCase = (string) => {
  const pass1 =  string.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase();
  })

  return pass1.replace(/[A-z][0-9]/g, (match) => {
    return match[0] + '-' + match[1];
  })
}

export const setupLogFile = () => {
  try {
    unlinkSync('./debug.log');
  } catch (err) {}
  
  const log_file = createWriteStream('./debug.log', {flags : 'w'});
  const log_stdout = process.stdout;

  console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };
}