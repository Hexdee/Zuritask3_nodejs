const express = require("express");
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

app.put('/infos:id', (req, res) => {
    	Info.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
	    country: req.body.country,
        email: req.body.email
	}, (err, info) => {
		if (err) {     
			return res.status(500).json({message: err})                                             
		} else if (!info) {
			return res.status(404).json({message: "Not found"}) 
		} else {
			info.save((err, savedinfo) => {
				if (err) {
					return res.status(400).json({message: err})
				} else return res.status(200).json({message: " updated successfully"})
			})
		}
    })
})

app.delete('/infos/:id', (req, res) => {
    Info.findByIdAndDelete(req.params.id, (err, info) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!info) {
            return res.status(404).json({message: "not found"})
        } else {
            return res.status(200).json({message: "deleted successfully!"})
        }
    })
})


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
