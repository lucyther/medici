const express = require('express');

// Creating an express app
var app = express();
app.use(express.static('public'));

// Set ejs as templating engine
// ejs looks into the 'views' folder for templates to render
app.set('view engine', 'ejs');

app.route('/wallet').get(function(req, res){
    res.render('wallet');
})

app.get('/', (req, res) => {
    let animals = [
      { name: 'Alligator' },
      { name: 'Crocodile' }
    ];
    res.render('home', { animals: animals });
  });

app.get('/newAnimals', function (req, res) {
    console.log('replying with new animals!');
    let animals = [
        { name: 'Llama' },
        { name: 'Tiger' }
      ];
    return res.status(200).json(animals);
});

app.post('/supplyEth', (req, res) => {
    console.log("received data from post request: ", req);
})

// Bind the application to the port on our machine
var server = app.listen(process.env.PORT || 8080); 