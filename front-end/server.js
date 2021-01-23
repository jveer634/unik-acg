const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/clinic-home-page'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/clinic-home-page/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);