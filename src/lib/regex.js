
/**
 * Matches `rgb(0, 0, 0);` and `rgba(0, 0, 0, 0.5);` type values with any number between 0-255 for colors values and any number (with or without decimal) for transparency
 */
export const rgbaRegex = /rgba*\(([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9\.]{1,4})\)/g

export const cssVarRegex = /var\(--mux-colors-([A-z0-9\-]*)\)/g

/**
 * matches `colors.new.gray100` and `colors.new.tealHover` regardless of context
 */
export const newColorTsRegex = /colors\.new\.([A-z0-9]*)/g

/**
 * matches `colors.gray20` but not `colors.new.gray20` or `colors.text`
 */
export const colorTsRegex = /colors\.(?!new)(?!text)(?!background)(?!primary)(?!border)(\w+)/g