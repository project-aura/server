const axios = require('axios');
const alchemicFormat = require('./alchemicFormat');
const alchemicSteroids = require('./alchemicSteroids');

/* 1. take URL
 * 2. get URL through axios. res.data is the target
 * 3. place res.data into a string var
 * 4a. shorten variable to find ambience
 * 4b. use indexOf(), substr(), replace(/\s/g, "")
 * 5. Formal shorter string variable
 */
const alchemicSearch = url =>
  axios
    .get(url)
    .then(res => {
      const ambience = 'Ambience';
      const desiredScrape = '<';
      const maxWidth = 200;
      let aura = '';
      // theoretical Virtual DOM
      const longString = res.data;
      if (longString.includes(ambience)) {
        const indexOfAura = longString.indexOf(ambience);
        // trim longString
        const shortString = longString.substr(indexOfAura + 8, maxWidth).trim();
        // regex replacement of whitespaces
        const noWhiteSpaces = shortString.replace(/\s/g, '');
        if(noWhiteSpaces[0] === desiredScrape) {
          // desired scrape gets normal formatting
          aura = alchemicFormat(noWhiteSpaces);
          // if after the return aura is still empty, 
          // inject steroids
          if(aura === '') {
            aura = alchemicSteroids();
          }
        }
        else {
          // in the event of the shitty scrape, use steroids
          aura = alchemicSteroids();
        }
      }
      // in the event of more shitty scrapes, use steroids
      if(aura === '') {
        aura = alchemicSteroids();
      }
      return aura;
    })
    .catch(aura => {
      // in the event of a request timeout,
      // use steroids.
      aura = alchemicSteroids();
      return aura;
    });

module.exports = alchemicSearch;