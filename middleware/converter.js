/**
 * Converters - converts attributes from the businesses
 * appends fields into the businesses depending on the function that is called
 * citySearch and categorySearch are fields that it will be appended to
 * since the business models have been updated to have these fields.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const zipCodes = require('../data/zipCodes');
const categories = require('../data/categories');

const cityConvert = async (businesses) => {
    const returnedBusinesses = await businesses.forEach(business => {
        let formattedCity;
        if(business.city !== 'Los Angeles') {
            formattedCity = business.city;
        }
        else {
            // city as Los Angeles needs to be curated 
            // further based of postal code
            // target a business' postal Code
            let zip;
            for(let key in zipCodes) {
                if(zipCodes[key].includes(business.postalCode)) {  
                    zip = key;
                    break;
                }
            }
            // format returned key from map
            if(zip === 'santaMonica') {
                formattedCity = 'Santa Monica';
            } else if(zip === 'DTLA') {
                formattedCity = 'Downtown Los Angeles';
            } else if(zip === 'culverCity') {
                formattedCity = 'Culver City';
            } else if(zip === 'beverlyHills') {
                formattedCity = 'Beverly Hills';
            } else if(zip === 'hollywood') {
                formattedCity = 'Hollywood';
            } else if(zip === 'vanNuys') {
                formattedCity = 'Van Nuys';
            } else if(zip === 'pasadena') {
                formattedCity = 'Pasadena';
            } else if(zip === 'newportBeach') {
                formattedCity = 'Newport Beach';
            } else if(zip === 'laBrea') {
                formattedCity = 'La Brea';
            } else if(zip === 'anaheim') {
                formattedCity = 'Anaheim';
            } else if(zip === 'rowlandHeights') {
                formattedCity = 'Rowland Heights';
            } else if(zip === 'brea') {
                formattedCity = 'Brea';
            } else if(zip === 'laguna') {
                formattedCity = 'Laguna';
            } else if(zip === 'huntingtonBeach') {
                formattedCity = 'Huntington Beach';
            } else if(zip === 'costaMesa') {
                formattedCity = 'Costa Mesa';
            } else if(zip === 'gardenGrove') {
                formattedCity = 'Garden Grove';
            } else {
                formattedCity = 'Greater Los Angeles';
            }
        }
        
        // do updates in here 
        // insert formattedCity into citySearch field
        business.citySearch = formattedCity;
    });

    // return the returnedBusinesses 
    return returnedBusinesses;
}

const categoryConvert = async (businesses) => {
    const returnedBusinesses = await businesses.forEach(business => {
        let formattedCategory = '';
        // categories is an array 
        business.categories.forEach(category => {
            // categories in '(let key in categories)' refer to the 
            // hash categories from require. see line 10. or around
            // line 10 if does get moved in the future.
            for(let key in categories) {
                if(categories[key].includes(category.alias)) {
                    // check if formattedCategory does not have cat.
                    if(!formattedCategory.includes(key)) {
                        // not appended to formattedCategory yet, so add
                        // it to formattedCategory
                        formattedCategory += `${key}, `;
                    }
                    // else, it already has the category, keep looping
                    // no point in having 2 categories to be the same
                    // it might or might not be a glorious pain in the ass
                }
                // else categories[key] doesnt include the category.alias
            }
        })

        // update in here
        // insert formattedCatergory into categorySearch
        business.categorySearch = formattedCategory;
    });

    // return the returnedBusinesses
    return returnedBusinesses;
}

const converter = {
    cityConvert,
    categoryConvert,
};
module.exports = converter;

