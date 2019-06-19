const express = require("express");
var Datastore = require("nedb");

const app = express();
const fs = require("fs");

app.listen(3000, () => {
  console.log("Server Starts at port 3000.");
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

// database.insert({ name: "laureal", status: 1 });

app.post("/api", (req, res) => {
  const data = req.body;
  const serverTime = Date.now();
  data.serverTime = serverTime;
  console.log(data);
  database.insert(data);
  res.json(data);
});

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      console.log(err);
      // return;
    }
    res.json(data);
  });
});
