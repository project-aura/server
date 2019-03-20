const { alchemicSearch } = require('./src/alchemicSearch');
const addr = 'https://www.yelp.com/biz/the-serving-spoon-inglewood';

invokeMysticalPowers = (urlParam) => {
    return alchemicSearch(urlParam);
}

// invokeMysticalPowers(addr)
//     .then(x => console.log(x));

module.exports = {
    invokeMysticalPowers,
};