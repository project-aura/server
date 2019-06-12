/**
 * Poll populator populates the poll based of aura 
 * from the webscraper and the categorySearch field.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });