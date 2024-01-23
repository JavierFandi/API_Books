const express = require('express');
const app = express();
app.use(express.json());

//Import books routers
const routerBooks = require('./routes/books');

//Import Middleware Error Handler
const errorHandler = require('./middlewares/errorHandler');

app.use('/books', routerBooks);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})