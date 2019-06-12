/**
 * Poll populator populates the poll based of aura 
 * from the webscraper and the categorySearch field.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const DataMaster = require('../controllers/DataMaster');
const businessController = require('../controllers/business.controller');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

/**
 * for auras
 * 1. READ all the businesses in the database (readMany)
 * 2. For each business, read the attributtes.aura field
 *      -> trim whitespace
 *      -> place each word into an array with the commas as delimiters
 *      -> for each entry in the array, find the appropriate key in the 
 *          auras field and increment that
 *      -> UPDATE the new auras field in the document (updateOne)
 * ======================================================================
 * for activities
 * 1. READ all businesses in the database (readMany)
 * 2. For each business, read the categorySearch field
 *      -> trim whitespace
 *      -> place each word into an array with the commas as delimiters
 *      -> for each entry in the array, find the appropriate ket in the 
 *          activities field and increment that
 *      -> UPDATE the new activities field in the document (updateOne)
 */
const populate = async () => {
    const comma = ',';
    const proc = await businessController.readMany({})
        .then(businesses => {
            for(let i = 0; i < businesses.length; ++i) {
                // THIS SECTION IS THE AURAS poll
                //=============================================================
                let attributeAura = businesses[i].attributes.aura;
                attributeAura = attributeAura.replace(/\s+/g, '');
                // make the array, using commas as delimiters
                let cursor = 0;
                let toBeShovedInArray = '';
                let auraArray = [];
                while(cursor < attributeAura.length) {
                    if(attributeAura[cursor] !== comma) {
                        toBeShovedInArray += attributeAura[cursor];
                    } else {
                        // delimiter has been encountered
                        auraArray.push(toBeShovedInArray);
                        toBeShovedInArray = '';
                    }
                    cursor++;
                }
                // push one more for that last entry
                auraArray.push(toBeShovedInArray);
                
                // on to the good stuff. SPREAD IT.... 
                for(let k = 0; k < auraArray.length; ++k) {
                    businesses[i].auras[auraArray[k]]++;
                }
                // THIS SECTION IS THE ACTIVITIES poll 
                //============================================================
                // DONE. update DB
                businessController.updateOne(businesses[i]._id, {
                    auras: businesses[i].auras,
                });
            }
        });
}

populate();



