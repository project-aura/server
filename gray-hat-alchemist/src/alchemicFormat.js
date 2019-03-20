/* alchemicFormat.js - formats data from alchemicSearch
 * Input -> alchemicSearch's variable called noWhiteSpaces
 * Output -> a string that represents aura
 */

 alchemicFormat = (text) => {
    /* How this works:
    * Search for the occurences of the auras:
    * Trendy, Cheerful, Inspired, Romantic,
    * Peaceful, Classy, Hipster, 
    * Spiritual, Silly, Touristy, 
    * Exotic, Upscale
    * The following variables are constant
    * representations of the auras
    */
    const trendy = 'trendy';
    const cheerful = 'cheerful';
    const inspired = 'inspired';
    const romantic = 'romantic';
    const peaceful = 'peaceful';
    const classy = 'classy';
    const hipster = 'hipster';
    const spiritual = 'spiritual';
    const silly = 'silly';
    const touristy = 'touristy';
    const exotic = 'exotic';
    const upscale = 'upscale';
    const casual = 'casual';
    const lively = 'lively';

    let aura;
    if(text.includes(cheerful)){ aura = cheerful }
    else if(text.includes(inspired)){ aura = inspired }
    else if(text.includes(romantic)){ aura = romantic }
    else if(text.includes(peaceful)){ aura = peaceful }
    else if(text.includes(classy)){ aura = classy }
    else if(text.includes(hipster)){ aura = hipster }
    else if(text.includes(spiritual)){ aura = spiritual }
    else if(text.includes(silly)){ aura = silly }
    else if(text.includes(touristy)){ aura = touristy }
    else if(text.includes(exotic)){ aura = exotic }
    else if(text.includes(upscale)){ aura = upscale }
    else if(text.includes(casual)){ aura = casual }
    else if(text.includes(lively)){ aura = lively }
    else{ aura = trendy }

    return aura;
}

module.exports = {
    alchemicFormat,
};
 
