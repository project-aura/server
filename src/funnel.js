const categories = require('./categories');

const funnelAction = (category, businesses) => {
  console.log(category);
  if (category === undefined) {
    return businesses;
  }

  const filteredBusinesses = [];

  for (let i = 0; i < businesses.length; i++) {
    for (let j = 0; j < businesses[i].categories.length; j++) {
      if (category === 'eating') {
        if (categories.eating.includes(businesses[i].categories[j].alias)) {
          filteredBusinesses.push(businesses[i]);
          break;
        }
      } else if (category === 'studying') {
        if (categories.studying.includes(businesses[i].categories[j].alias)) {
          filteredBusinesses.push(businesses[i]);
          break;
        }
      } else if (category === 'dating') {
        if (categories.dating.includes(businesses[i].categories[j].alias)) {
          filteredBusinesses.push(businesses[i]);
          break;
        }
      } else if (category === 'relaxing') {
        if (categories.relaxing.includes(businesses[i].categories[j].alias)) {
          filteredBusinesses.push(businesses[i]);
          break;
        }
      } else if (category === 'drinking') {
        if (categories.drinking.includes(businesses[i].categories[j].alias)) {
          filteredBusinesses.push(businesses[i]);
          break;
        }
      } else if (category === 'shopping') {
        if (categories.shopping.includes(businesses[i].categories[j].alias)) {
          filteredBusinesses.push(businesses[i]);
          break;
        }
      }
    }
  }
  return filteredBusinesses;
};

module.exports = funnelAction;
