require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const vigilanteRoute= require('./routes/vigilanteRoute');
const userRoute= require('./routes/userRoute');
const authRoute= require('./routes/authRoute')

const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRoute);
app.use('/vigilantes',vigilanteRoute);
app.use('/user',userRoute)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));