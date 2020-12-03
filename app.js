const express = require("express");
const app     = express();
const fetch   = require("node-fetch");
const pool    = require("./dbPool.js");

app.set("view engine", "ejs");
app.use(express.static("public"));


//routes
app.get("/", async function(req, res){
   
      app.get("/search", async function(req, res){
       
       let keyword = "";
       if (req.query.keyword) {
           keyword = req.query.keyword;
       }
  
       let apiUrl = 'https://images.unsplash.com/flagged/photo-1556047124-cd8579bd09b3?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEwMzUxOH0';
       let response = await fetch(apiUrl);
       let data = await response.json();
       
       let imageUrlArray = [];
       for (let i = 0; i < data.length; i++) {
           imageUrlArray.push(data[i].urls.small);
       }
    
       res.render("results", {"imageUrl": data[0].urls.small, "imageUrlArray":imageUrlArray});
       
      });
      
       app.get("/getKeywords",  function(req, res) {
       let sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
       let imageUrl = ["img/favorite.png"];
       pool.query(sql, function (err, rows, fields) {
       if (err) throw err;
       console.log(rows);
       res.render("favorites", {"imageUrl": imageUrl, "rows":rows});
  });  
});//getKeywords
});

/*app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});*/

app.listen("8080", "127.0.0.1", function() { 
    console.log("Running Express Server..."); 
});