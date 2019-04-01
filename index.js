const express =  require('express');
const mongoose =  require('mongoose');
const genreRoute = require('./routes/genres');
const customersRoute = require('./routes/customers');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/vidlyDB', {useNewUrlParser: true})
        .then( () => {console.log('Connected to mongodb')},
               err => console.log(err)
    );
app.use('/api/genres', genreRoute);
app.use('/api/customers', customersRoute);
const port =  process.env.PORT || 6677
app.listen(port, () => console.log(`Listening on port ${port}`));

