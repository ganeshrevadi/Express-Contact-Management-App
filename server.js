const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));

