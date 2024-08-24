const express = require('express');
const app = express();
const PORT = 8000;
const connectToDb = require('./connection');
const userRoute = require('./routes/user');
const path = require('path');

connectToDb('mongodb://127.0.0.1:27017/blogify')
.then(()=> console.log('Connected to DB'))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended : false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/user", userRoute);

app.get("/", function(req,res){
    res.render("home")
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));