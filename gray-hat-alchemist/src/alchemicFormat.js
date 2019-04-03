/* alchemicFormat.js - formats data from alchemicSearch
 * Input -> alchemicSearch's variable called noWhiteSpaces
 * Output -> a string that represents aura
 */

 /**
  * @param {text} -> the argument passed into the function. 
  * 1. convert text to lower case
  * 2. trim the garbage tags in front
  * 3. trim the garbage tags in back
  * 4. return
  */
 alchemicFormat = text => {
    let returnedAura = text.toLowerCase();
    returnedAura = returnedAura.substr(9, 70).trim();
    const indexOfAngleBracket = returnedAura.indexOf('<');
    returnedAura = returnedAura.substr(0, indexOfAngleBracket).trim();
    return returnedAura;
}

module.exports = alchemicFormat;
 
