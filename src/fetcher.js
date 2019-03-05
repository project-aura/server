/* fetcher.js
 * Input - postalCode, aura and purpose
 * For MVP: find 3 obejects in the JSON file
 * fetched. JSON file is a MOCK call to API/DB
 * Will be called by another program from user input
 * with the 3 parameters
 * Output: array with 3 objects at most (MVP only)
 *-----------------------------------------------------------------------------
 */

const fs = require('fs').promises;
const path = require('path');
// file path to the JSON with business data, change this acordingly
const backPath = '..';
const sampleDataPath = 'sample-data';
const yelpPath = 'yelp';
const businessDataPath = 'businessData.json';
const NOTHING = 'NOTHING'; // for returns of nothing

/* ----------------------------------------------------------------------------- */

// fetcher function begins
async function fetcher(postalCode, aura, purpose) {
  // these 2 variables are used as placeholders for
  // aura and name of place and then
  // read the JSON file and place it in a variable
  let auraReturn;
  let nameReturn;
  let purposeReturn;

  // TEST: Scott made changes to the file system, so make sure you test these contents.

  const contents = await fs.readFile(
    path.join(__dirname, backPath, sampleDataPath, yelpPath, businessDataPath),
    'utf8'
  );

  // parse contents (gives you an array) then
  // iterate over the array looking for obj.postal_code === postalCode
  // matching the postal code is important
  const data = JSON.parse(contents);
  const obj = data.filter(key => {
    if (key.postal_code === postalCode) {
      // take ambience and category from API, then ,match it to
      // aura argument and category argument, FORMAT aura before checking
      const att = key.attributes.Ambience;
      const cat = key.categories;
      aura.concat(': True');
      if (att.includes(aura) && cat.includes(purpose)) {
        // aura and category match found
        auraReturn = aura;
        nameReturn = key.name;
        purposeReturn = purpose;
      } else {
        // no aura match
        auraReturn = NOTHING;
      }
      return key;
    }
    return undefined;
  });
  // show results if obj was returned or aura was returned
  // otherwise, there were no returned results
  if (obj.length !== 0 && auraReturn !== 'NOTHING') {
    console.log(`\t\t\t=======================================================
                    \tYou requested: ${aura} at ${postalCode} for ${purpose}\n
                    \tPlace Found!\n
                    \tName: ${nameReturn}\n
                    \tAura: ${auraReturn}\n
                    \tFor: ${purposeReturn}`);
  } else {
    console.log(`\t\t\t======================================================
                    \tYou requested: ${aura} at ${postalCode} for ${purpose}\n
                    \tNO RESULTS FOUND`);
  }
}

fetcher('85201', 'divey', 'Nightlife'); // returns
fetcher('asdfs', 'something', 'Nightlife'); // nothing
fetcher('89052', 'romantic', 'sex'); // nothing