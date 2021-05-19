const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3000;
const env = require('./enviroment');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: env.URL_CORS}));
app.use(express.static('uploads'));

app.use('/users', require('./routes/user.routes'));
app.use('/pets', require('./routes/pet.routes'));
app.use('/adds', require('./routes/add.routes'));
app.use('/comunications', require('./routes/comunication.routes'));
app.use('/email', require('./routes/email.routes'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

