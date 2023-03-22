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

  const red = hexToNum(hex.substring(0, 1));

  const green = hexToNum(hex.substring(2,3));

  const blue = hexToNum(hex.substring(4,5));
  
  return {
    red,
    green,
    blue,
  }
}

export const isGrayScale = (hexCode) => {
  const channels = parseHexCodeToChannels(hexCode);
  return channels.red === channels.blue && channels.blue === channels.green;
}
