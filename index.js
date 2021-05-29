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

app.listen(5000, () => console.log("server running on port 5000"))