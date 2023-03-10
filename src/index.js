const express = require('express');
const routes = require('./route/index');
const bodyParser = require('body-parser');
const path = require('path');
const app = require('./swagger');

// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json());

// Serve static files from the React app in root directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Use router
app.use('/api', routes);

// Handles any requests that don't match the ones above
app.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});


// Create server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);

