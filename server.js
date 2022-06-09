require("dotenv").config();

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const sessionMiddleware = require("./middleware/session");

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
const apiRouter = require("./apis/index");
const endpointRouter = require("./routes/endpoint");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.set("layout extractMetas", true);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(expressLayouts);
app.use(express.json());
app.use(express.static("public")); //where most server files will be
app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.use(session(sessionConfig));
app.use(sessionMiddleware);

// const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE_URL, {});
// const db = mongoose.connection;
// db.on("error", error => console.error(error));
// db.once("open", () => console.log("Connected to Mongoose"));


app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/endpoint", endpointRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));