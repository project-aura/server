/**
 * This file 
 * 1. takes all of the businesses
 * 2. reads the postal code of each business
 * 3. figures out the city of the business from the given postal code
 * 4. saves it in the field called 'citySearch'
 * 5. saves it back to the DB. -> Call updateOne() save each time its
 * updated.
 * That was a mouthful
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');
const zipCodes = require('../data/zipCodes');

// connect to DB
const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

// object that holds all the businesses
businessController.readMany()
    .then(businesses => 
        // target individual business from aggregate storage
        businesses.forEach(business => {
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
                    if(zipCodes[key].includes(business.postalCode)){  
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
        })
    );
