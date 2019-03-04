require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
