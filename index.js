const express = require('express');
const path = require('path');

const routes = require('./server/routes/index.js');
const handleError = require('./server/middlewares/errorHandler.js');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
    next();
});

app.use(express.json());

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'components', 'login.html')); });

// Handle routes
app.use('/api', routes);

// common error handler middleware
app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});