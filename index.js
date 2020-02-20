var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
const validateRegisterInput = require("./validations/register");
var app = express();
port = 5000;

var url = "mongodb://localhost:27017";

// Database variable
var db;
// Use mongodb connect method to connect to the local mongodb server
MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to Mongo DB server");

    db = client.db('idflo');
});


// body-parser, handlebars & express-static middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


const country = {
  India: ["Delhi", "Bangalore", "Bombay"],
  USA: ["Chicago", "Lafayette", "New York City"],
  China: ["Beijing", "Hong Kong", "Shanghai"]
};

// get all country api
app.get('/country', function (req, res) {
    const countryArr = []
    Object.keys(country).forEach((key, index) => {
            countryArr.push(key)
    })
    res.json(countryArr);
});

// /fetchCitiesForCountry - make this a GET request. Once the user selects a country,
// fetch the cities associated with that country
// get all country api
app.post('/fetchCitiesForCountry', function (req, res) {
    console.log(req.body);
    let cityArr;
    Object.keys(country).forEach((key, index) => {
            if (key.toLowerCase() === req.body.country.toLowerCase()) {
                    cityArr = country[key]
            }
    })
    res.json(cityArr);
});

// /submitForm - make this a POST request. Once the user hits the Submit button on the form, 
// this route will receive the form data.

// Create a form with the following fields:
// Name
// Date of birth
// Country
// City

app.post("/submitForm", function(req, res) {
    var newUser = 
    {
        name: req.body.name,
        city:req.body.city,
        country:req.body.country,
        dateOfBirth:req.body.dateOfBirth
    }

     const { errors, isValid } = validateRegisterInput(req.body);

     // Check Validations
     if (!isValid) {
       return res.status(400).json(errors);
     }
    // let dobValidation = /^(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})$/
        db.collection("users").insertOne(newUser)
            .then(result => {
                if(!result) {
                    return res.status(400).json(errors)
                } else {
                    res.status(200).json(result)
                }
            })

});


app.listen(port, function() {
  console.log("server is running at port " + port);
});


// let errors = {};
// // let dob = /^(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})$/;
// let newUser = {
//     name: req.body.name,
//     city: req.body.city,
//     dateOfBirth: req.body.dateOfBirth,
//     country: req.body.country
// }

// if (newUser.name.length < 3) {
//     errors.name = 'name must be greater than three character'
// }
// console.log(req.body);
// // // console.log(req.body.dateOfBirth.match(dob));
// db.collection("users").insertOne(newUser, function (err, result) {
//     if (err) {
//         // throw error;
//         return res.status(400).json(errors);
//     } else {
//         if (!result) {
//             return res.status(400).json(errors)
//         } else {
//             console.log('inserted');
//             res.json("Success user Inserted")
//         }
//     }
// });