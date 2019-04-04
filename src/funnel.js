const funnelAction = (category, businesses) => {
  // filtering businesses based on category
  const filteredBusinesses = [];
  businesses.map(business => {
    business.categories.map(temp => {
      if (temp.alias === category) {
        filteredBusinesses.push(business);
      }
    });
  });
  return filteredBusinesses;
};

module.exports = {
  funnelAction
};
