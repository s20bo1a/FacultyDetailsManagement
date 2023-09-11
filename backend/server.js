const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");
const multer= require("multer")
const path=require("path")

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "faculty",
});

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public_html/', 'uploads'),
  filename: function (req, file, cb) {   
      cb(null, Date.now() + '-' + file.originalname )  
  }
})


app.get("/", (req, res) => {
  var s1 = req.query.s1;
  console.log("server started...");
  db.query(
    `SELECT * FROM ${s1};`,
    (err, result) => {
      if (err) console.log(err);
      else {
        {
          res.send(result);
        }
      }
    }
  );
});

const det=(no)=>{
  app.get("/userdata", (req, res) => {
    var sql = "select * FROM `it` WHERE `facultyid`=?";
    db.query(sql,[no],
      (err, result) => {
        if (err) console.log(err);
        else {
          {
            res.send(result);
          }
        }
      }
    );
  });
}

app.post("/Report", (req, res) => {
  const no = req.body.s; 
  det(no)
 });

app.listen(8080, () => {
  console.log("listening.........");
});