const express = require('express');
const app = express();
const PORT = 8000;
const connectToDb = require('./connection');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const path = require('path');
const cookieParser = require('cookie-parser');
const checkForAuthenticationCookie = require('./middlewares/authentication');
const Blog = require('./models/blog');

connectToDb('mongodb://127.0.0.1:27017/blogify')
.then(()=> console.log('Connected to DB'))
.catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use("/user", userRoute);
app.use("/blog", blogRoute);


app.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user : req.user,
        blogs : allBlogs
    })
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));