export const parseRgbaToChannels = (rgbaString) => {

  const isRgba = !!rgbaString.match(/rgba/g);

  const parts = isRgba ? rgbaString.substring(5, rgbaString.length - 1).split(", ") : rgbaString.substring(4, rgbaString.length - 1).split(", ");

  const red = parseInt(parts[0]);
  const green = parseInt(parts[1]);
  const blue = parseInt(parts[2]);
  const alpha = parseFloat(parts[3] || 1);

  return {
    red, green, blue
  }
}

export const parseColorToChannels = (color) => {
  const colorIsHex = !!color.match(/#/g);
  const colorIsRgb = !!color.match(/rgba*/g);

  if (colorIsHex) return parseHexCodeToChannels(color);

  if (colorIsRgb) return parseRgbaToChannels(color);

  throw new Error(`Color: ${color} could not be parsed`);
}

export const parseHexCodeToChannels = (hexCode) => {

  const isValidHex = !!hexCode.match(/#([a-fA-F0-9]){3,6}/g);

  if (!isValidHex) throw new Error(`Invalid Hex ${hexCode}`);

  // drop the # 
  let hex = hexCode.substring(1);

  // double up shortened codes
  hex = hex.length === 3 ? hex + hex : hex;

  const red = hexToNum(hex.substring(0, 2));

  const green = hexToNum(hex.substring(2,4));

  const blue = hexToNum(hex.substring(4));

  return { red, green, blue };
}

const hexToNum = (hex) => {
  return parseInt(hex, 16);
}

export const rgbaToRgb = (rgbaString) => {
  const channels = parseRgbaToChannels(rgbaString);

  return `rgb(${channels.red}, ${channels.green}, ${channels.blue})`
}