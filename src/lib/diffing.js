import themeColors from './colors.js';
import { parseColorToChannels, rgbaToRgb } from './parse.js';
import diff from 'color-diff';

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

  const deltaR = r1 - r2;
  const deltaG = g1 - g2;
  const deltaB = b1 - b2;

  const redmean = Math.sqrt(Math.abs((2+r/256) * deltaR^2 + 4 * deltaG^2 + (2 + (255 - r)/256) * deltaB ^ 2));

  const asbDeltaR = Math.abs(deltaR);
  const absDeltaG = Math.abs(deltaG);
  const absDeltaB = Math.abs(deltaB);

  const redmeanAbs = Math.sqrt((2+r/256) * asbDeltaR^2 + 4 * absDeltaG^2 + (2 + (255 - r)/256) * absDeltaB ^ 2);

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
  const colorPool = Object.keys(themeColors).map(name => ({name, ...parseColorToChannels(themeColors[name])}));

  const channels = parseColorToChannels(color);
  delete channels.A;

  const match = diff.closest(channels, colorPool);

  return match;
}