require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const dataSnatcher = require("./src/dataSnatcher");

const app = express();

/* Added on 3/5/2019
 * 1. body parser middleware
 * 2. form data
 * 3. CORS middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// static middleware
app.use(express.static(path.join(__dirname, "public")));
/* MIGHT need to put some STATIC MIDDLEWARE IN HERE (Optional)
 * Route and Set endpoints.
 */
app.use("/", dataSnatcher);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
