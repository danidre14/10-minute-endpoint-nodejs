require("dotenv").config();

const express = require("express");
const xmlparser = require('express-xml-bodyparser');
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors());
app.options(cors());

const sessionMiddleware = require("./middleware/session");

const User = require("./models/User");

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false, //dont save variables if nothing has changed
    saveUninitialized: false, //dont save empty value in session if there is no value
    cookie: { maxAge: 60000 * 10 }
}

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1) // trust first proxy
    sessionConfig.cookie.secure = true // serve secure cookies
}

// routes
const indexRouter = require("./routes/index");
const endpointRouter = require("./routes/endpoint");

const apiRouter = require("./routes/apis/index");

const error404Router = require('./routes/error404');

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.set("layout extractMetas", true);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(xmlparser({ normalizeTags: false }));
app.use(express.static("public")); //where most server files will be

app.use(session(sessionConfig));
app.use(sessionMiddleware);


app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/endpoint", endpointRouter);

app.use(error404Router); //make sure to put this after all routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    deleteExpiredEndpoints();
});

// delete expired users every 10 minutes

const deleteExpiredEndpoints = async function () {
    console.log("Deleting expired endpoints");
    const count = await User.deleteExpiredUsers();
    console.log(`Deleted ${count} expired endpoint(s)`);

    setTimeout(deleteExpiredEndpoints, 1000 * 60 * 10);
}