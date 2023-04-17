const mongoose = require('mongoose');
const express = require("express"); // required installed packages
const bodyParser = require("body-parser");

const port = 8080

const app = express(); // app constant by using express
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/testdb');


// Define a schema for your collection
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create a model from the schema
const Person = mongoose.model('Person', personSchema);
app.get("/findAll", function (req, res) {
    Person.find({})
    .then((people) => {
      if (people.length === 0) {
        res.status(404).send("No Person Found");
      } else {
        const results = people.map((person) => {
          return {
            _id: person._id,
            name: person.name,
            age: person.age,
            email: person.email,
          };
        });
        res.send(results);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });

});

app.get("/find", function (req, res) {
  const userInput = req.body.name;

  Person.findOne({ name: userInput })
    .then((person) => {
      if (!person) {
        res.status(404).send("Person Not Found");
      } else {
        const result = {
          _id:person._id,
          name: userInput,
          age: person.age,
          email: person.email,
        };
        res.send(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });

});

app.post("/add", function (req, res) {
  Person.exists({ name: req.body.name })
  .then ((person) =>{
    if (!person) {
      const newPerson = new Person({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
      });
      // Create a new document and save it to the collection
      newPerson.save()
      res.send(`${req.body.name} was added!`);
    }else{
      res.send(`Can not add ${req.body.name} because it already added!`);
    }
  });
});

app.delete("/delete", function (req, res) {
  const userInput = req.body.name;
  Person.exists({ name: userInput })
  .then ((person) =>{
    if (!person) {
      res.send(`Can not delete ${req.body.name} because it already deleted!`);
    }else{
      Person.deleteOne({name: userInput}).then(() => {
        res.send(`${userInput} was deleted!`);
      });
    }
  });
});


app.put("/update", function (req, res) {
  const userInput = req.body.name;
  Person.exists({ name: userInput })
  .then ((person) =>{
    if (!person) {
      res.send(`There is no ${req.body.name}`);
    }else{
      Person.updateOne({name: userInput}, { age: req.body.age, email: req.body.email }).then(() => {
        res.send(`${userInput} was updated!`);
      });
    }
  });
});

app.listen(port, function () {
    console.log("Server is running on port: "+port);
});

