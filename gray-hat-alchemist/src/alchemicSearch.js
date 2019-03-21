const axios = require('axios');
const { alchemicFormat } = require('./alchemicFormat');

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
      const maxWidth = 200;
      let aura = 'Trendy';
      const longString = res.data;
      if (longString.includes(ambience)) {
        const indexOfAura = longString.indexOf(ambience);
        // trim longString
        const shortString = longString.substr(indexOfAura, maxWidth).trim();
        // regex replacement of whitespaces
        const noWhiteSpaces = shortString.replace(/\s/g, '');
        aura = noWhiteSpaces;
        // call alchemicFormat
        // console.log(aura);
        aura = alchemicFormat(aura);
      }
      return aura;
    })
    .catch(error => console.error(error));

module.exports = {
  alchemicSearch,
};
