/**
 * Converters - converts attributes from the businesses
 * appends fields into the businesses depending on the function that is called
 * citySearch and categorySearch are fields that it will be appended to
 * since the business models have been updated to have these fields.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
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
        
        // do updates in here then lol
        businessController.updateOne(business._id, {
            citySearch: formattedCity,
        });
    });

    return returnedBusinesses;
}

const categoryConvert = async (businesses) => {
    // TODO
}

const converter = {
    cityConvert,
    categoryConvert,
};
module.exports = converter;

