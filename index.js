const express = require('express');

const routes = require('./server/routes/index.js');
const handleError = require('./server/middlewares/errorHandler.js');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
    next();
});

// Handle routes
app.use('/api', routes);

// common error handler middleware
app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});