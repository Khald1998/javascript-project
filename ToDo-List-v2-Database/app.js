const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var _ = require("lodash");
const port = 8080
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/testdb');

const itemsSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!",
});
const item2 = new Item({
  name: "Hit the + button to add a new item.",
});
const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];



const listSchema = {
  name: String,
  items: [itemsSchema],
};


const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {

  Item.find({})
  .then(foundItems => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems)
        .then(() => {
          console.log("Successfully saved default items to DB.");
          res.redirect("/");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  })
  .catch(err => {
    console.log(err);
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName })
  .then(foundList => {
    if (!foundList) {
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", {
        listTitle: foundList.name,
        newListItems: foundList.items,
      });      
    }
  })
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list; // list is the name of the button on list.ejs

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    // default list
    item.save(); // mongoose shortcut to "insertOne" or Many
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
    .then(foundList => {
    foundList.items.push(item);
    foundList.save();
    res.redirect("/" + listName);
    })
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {

    Item.findByIdAndDelete(checkedItemId)
    .then(() => {
      console.log("Successfully deleted the checked item.");
      res.redirect("/");
    })
  } else { // if it not the default list

    List.findOneAndUpdate({ name: listName }, { $pull: {items: {_id: checkedItemId}} })
      .then(foundList => {
        res.redirect("/" + listName);
      })


  }
});



app.get("/about", function (req, res) {
  res.render("about");
});



app.listen(port, function () {
  console.log("Server has started successfully.");
});
