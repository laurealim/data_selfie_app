const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, () => {
  console.log("Server Starts at port 3000.");
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  //   console.log(req.body);

  //   fs.stat.isFile("temp.txt", (err, stat) => {
  //   console.log('chek');

  // if (err == null) {
  //   console.log("File exists");
  //   fs.appendFile("temp.txt", "Hello content!", err => {
  //     if (err) throw err;
  //     console.log("Saved!");
  //   });
  // } else if (err.code === "ENOENT") {
  //   // file does not exist
  //   fs.writeFile("temp.txt", "Some log\n");
  // } else {
  //   console.log("Some other error: ", err.code);
  // }
  //   });
  const saveData = {
    status: "success",
    latitude: req.body.lat,
    longitude: req.body.lon,
    timestamp: req.body.time
  };
  console.log(saveData);

  fs.appendFile("temp.txt", JSON.stringify(saveData)+'\n', function(err) {
    if (err) throw err;
    console.log("Saved!");
  });

  res.json({
    status: "success",
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: req.body.time
  });
});
