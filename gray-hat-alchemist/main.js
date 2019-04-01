const { alchemicSearch } = require('./src/alchemicSearch');

invokeMysticalPowers = (urlParam) => {
    return alchemicSearch(urlParam);
}

// invokeMysticalPowers(addr)
//     .then(x => console.log(x));

module.exports = {
    invokeMysticalPowers,
};