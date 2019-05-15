/**
 * This file
 * 1. takes all of the businesses
 * 2. reads the categories array of each business
 * 3. figures out the category of the business from the given subcategories
 * 4. saves it in the field called 'categorySearch'
 * 5. saves it back to the DB. -> Call updateOne() save each time its
 * updated.
 * That was a mouthful
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');
const categories = require('../data/categories');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

// object the holds all the businesses
businessController.readMany()
    .then(businesses => 
        // target individual business from aggregate storage 
        businesses.forEach(business => {
            let formattedCategory = '';
            // categories is an array 
            business.categories.forEach(category => {
                // categories in '(let key in categories)' refer to the 
                // hash categories from require. see line 16. or around
                // line 16 if does get moved in the future.
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

            // DB update in here
            businessController.updateOne(business._id, {
                categorySearch: formattedCategory,
            });
        })
    );
