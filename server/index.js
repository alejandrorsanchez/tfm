const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3000

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

app.use('/users', require('./routes/user.routes'));
app.use('/pets', require('./routes/pet.routes'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

