const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/crudapp';

app.use(express.json())

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) console.log(err)
    else console.log('Database connection successful!')
})

const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String
})

const Data = mongoose.model('Data', dataSchema);

app.post('/userdata', function(req, res){
    Data.create({
        name: req.body.data.name,
        email: req.body.data.email,
        country: req.body.country
    })
}, (err, newUser) => {
    if (err) return res.status(500).json({message: err})
    else return res.status(200).json({message: "new user created, newUser"})
})

app.listen(5000, () => console.log("server running on port 5000"))const express = require("express");

const mongoose = require("mongoose");



const app = express();



app.use(express.json());



const connectionString = "mongodb://Hexdee:hexdee@cluster0-shard-00-00.o8ekz.mongodb.net:27017,cluster0-shard-00-01.o8ekz.mongodb.net:27017,cluster0-shard-00-02.o8ekz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-w00jzy-shard-0&authSource=admin&retryWrites=true&w=majority"



mongoose.connect(connectionString, {

      useNewUrlParser: true,

      useFindAndModify: false,

      useUnifiedTopology: true

    }, (err) => {

        if (err) {

            console.log(err)

        }

        else {

            console.log("Database connection successful!")

        }

    });

  



const infoSchema = new mongoose.Schema({

  name: {

    type: String,

    required: true

  },

  country: {

    type: String,

    required: true

  },

  email: {

    type: String,

    required: true,

    unique: true

  }

});



const Info = mongoose.model("Info", infoSchema);



app.post('/infos', (req, res) => {

    Info.create({

        name: req.body.name,

        country: req.body.country,

        email: req.body.email

    })

}, (err, newInfo) => {

    if(err) {

        return res.status(500).json({message: err})

    }

    else {

        return res.status(200).json({message: "new Info saved", newInfo})

    }

})



app.get('/infos', (req, res) => {

    Info.find({}, (err, infos) => {

        if(err) {

            return res.status(500).json({message: err})

        } else {

            return res.status(200).json({infos})

        }

    })

})



app.get('/infos', (req, res) => {

    Info.findOne({_id: req.params.id}, (err, info) => {

        if (err) {

            return res.status(500).json({message: err})

        } else if (!info) {

            return res.status(404).json({message: "Not found"})

        } else {

            return res.status(200).json({info})

        }

    })

})



app.listen(4000, () => {

  console.log("Server is running on port 4000");

});
