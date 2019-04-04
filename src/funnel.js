const funnelAction = (category, businesses) => {
  // filtering businesses based on category
  businesses.map(business => {
    business.categories.map(temp => {
      if (temp.alias === 'italian') {
        console.log('Its a me a Mario');
      }
    });
  });
  return businesses;
};

module.exports = {
  funnelAction
};
