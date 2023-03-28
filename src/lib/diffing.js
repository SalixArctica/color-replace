import themeColors from './colors.js';
import { parseColorToChannels, rgbaToRgb } from './parse.js';

/**
 * Readmean color difference algorithm
 * @see https://www.compuphase.com/cmetric.htm
 */
export const redmeanColorComparison = (color1, color2) => {

  const channels1 = parseColorToChannels(color1);
  const channels2 = parseColorToChannels(color2);

  const { red: r1, blue: b1, green: g1 } = channels1;
  const { red: r2, blue: b2, green: g2 } = channels2;

  const r = (r1 + r2)/2

  const deltaR = Math.abs(r1 - r2);
  const deltaG = Math.abs(g1 - g2);
  const deltaB = Math.abs(b1 - b2);

  const redmean = Math.sqrt((2+r/256) * deltaR^2 + 4 * deltaG^2 + (2 + (255 - r)/256) * deltaB ^ 2);

  return redmean;
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

export const findBestMatch = (color) => {
  const colorPool = Object.keys(themeColors).map(name => ({name, color: themeColors[name]}))


  return colorPool.reduce((bestMatch, current) => {
    const diff = redmeanColorComparison(color, current.color);



    console.log(`${rgbaToRgb(color)} ~ ${current.color} diff is: ${diff}`);

    if(bestMatch === null) {
      return {
        ...current,
        diff
      }
    }

    if(diff < bestMatch.diff) {
      return {
        ...current,
        diff
      }
    } else {
      return bestMatch;
    }
  }, null)
}