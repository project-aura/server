const alchemicSearch = require('./src/alchemicSearch');

invokeMysticalPowers = (urlParam) => {
    return alchemicSearch(urlParam);
}

module.exports = invokeMysticalPowers;