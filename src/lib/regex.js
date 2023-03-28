
/**
 * Matches `rgb(0, 0, 0);` and `rgba(0, 0, 0, 0.5);` type values with any number between 0-255 for colors values and any number (with or without decimal) for transparency
 */
export const rgbaRegex = /rgba*\(([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3})(?:\);|, *)?([0-9\.]*)\)/g