import { redesignColors, newColors } from "./redesignToNew.js";


export const generateSwap = () => {
  const newColorNames = Object.keys(newColors);

  Object.keys(redesignColors).map(oldColor => {

    const result = newColorNames.find((newColorName) => newColors[newColorName].toLowerCase() === redesignColors[oldColor].toLowerCase());

    if(!result) {
      console.log(`no match could be found for ${oldColor} with value ${redesignColors[oldColor]}`)
    } else {

      console.log(`'${oldColor}': '${result}'`);
      return result;
    }


  })
}
