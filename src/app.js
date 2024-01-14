const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
require('./config/database');

const userRoutes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

app.use('/api', userRoutes); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
