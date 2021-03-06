const zipCodes = require('../data/zipCodes');

const funnelZip = (location, businesses) => {
  if (location === undefined) {
    return businesses;
  }

  const filteredBusinesses = [];
  for (let i = 0; i < businesses.length; ++i) {
    if (location === 'santa monica') {
      if (zipCodes.santaMonica.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'downtown la') {
      if (zipCodes.DTLA.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'culver city') {
      if (zipCodes.culverCity.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'beverly hills') {
      if (zipCodes.beverlyHills.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'hollywood') {
      if (zipCodes.hollywood.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'van nuys') {
      if (zipCodes.vanNuys.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'pasadena') {
      if (zipCodes.pasadena.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'newport beach') {
      if (zipCodes.newportBeach.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'la brea') {
      if (zipCodes.laBrea.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'anaheim') {
      if (zipCodes.anaheim.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'rowland heights') {
      if (zipCodes.rowlandHeights.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'brea') {
      if (zipCodes.brea.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    } else if (location === 'laguna') {
      if (zipCodes.laguna.includes(businesses[i].postalCode)) {
        filteredBusinesses.push(businesses[i]);
      }
    }
  }
  return filteredBusinesses;
};

module.exports = funnelZip;
