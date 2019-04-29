const zipCodes = require('../data/zipCodes');

const funnelZip = (location, businesses) => {
  if (location === undefined) {
    return businesses;
  }

    const filteredBusinesses = [];
    for(let i = 0; i < businesses.length; ++i) {
        if(location === 'Santa Monica') {
            if(zipCodes.santaMonica.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            } 
        } else if(location === 'DTLA') {
            if(zipCodes.DTLA.includes(businesses[i].postalode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Culver City') {
            if(zipCodes.culverCity.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Beverly Hills') {
            if(zipCodes.beverlyHills.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Hollywood') {
            if(zipCodes.hollywood.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Van Nuys') {
            if(zipCodes.vanNuys.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Pasadena') {
            if(zipCodes.pasadena.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Newport Beach') {
            if(zipCodes.newportBeach.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'La Brea') {
            if(zipCodes.laBrea.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Anaheim') {
            if(zipCodes.anaheim.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Rowland Heights') {
            if(zipCodes.rowlandHeights.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Brea') {
            if(zipCodes.brea.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        } else if(location === 'Laguna') {
            if(zipCodes.laguna.includes(businesses[i].postalCode)) {
                filteredBusinesses.push(businesses[i]);
                break;
            }
        }
    }
    return filteredBusinesses;
};

module.exports = funnelZip;