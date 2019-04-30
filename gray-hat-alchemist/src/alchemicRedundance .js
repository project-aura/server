/**
 * What really is the point of this...
 * Take a string of aura or auras. 
 * If the string contains a ',' (comma) then return
 * the string, no need to append further auras.
 * Else, generate a random number between 0 and 1
 * If generated is 0, then return solo aura.
 * Else, try to append another aura making sure that
 * the aura is different. 
 */

const alchemicRedundance = aura => {
    // if there are multiple auras already, just return the auras.
    const indexComma = aura.indexOf(',');
    if(indexComma !== -1) {
        return aura;
    }

    // If not then generate random number whether aura will be added or not
    const zeroOrOne = Math.round(Math.random());
    if(aura === 'classy') {
        aura = 'classy, intimate';
    } else if(aura === 'cheerful' || aura === 'lively') {
        if(zeroOrOne === 0) {
            aura = 'cheerful, lively';
        } else {
            aura = 'cheerful, lively, casual';
        }
    } else if(aura === 'romantic' || aura === 'intimate') {
        if(zeroOrOne === 1) {
            aura = 'romantic, intimate';
        }
    } else if(aura === 'inspired') {
        if(zeroOrOne === 1) {
        aura = 'inspired, trendy';
        } 
    } else if(aura === 'casual') {
        if(zeroOrOne === 1) {
            aura = 'casual, inspired';
        }
    }

    return aura;
}

module.exports = alchemicRedundance;