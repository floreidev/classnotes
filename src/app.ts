import express from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from "express-session"
import passport from "passport";
import favicon from "serve-favicon"
import local from "./strategies/local";

local(passport);

import index from "./routes/index"
import login from "./routes/login"
import auth from "./routes/auth"
import signup from "./routes/signup"
import donate from "./routes/donate"
import home from "./routes/home"
import onboard from "./routes/onboarding"

mongoose.connect(process.env.DBURL || "").then((m) => {
    console.log("Connected")
}).catch((err) => {
    console.log(err)
})



const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET || "%&dfcsdfsdfafaijsajioOIJISODFj()*()jNDnas&(nANSD867DANMHd#a'[;/.,as[]al r[pk'k#a",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", login);
app.use("/signup", signup);
app.use("/auth", auth);
app.use("/donate", donate);
app.use("/home", home);
app.use("/on-boarding", onboard);

app.use((req, res, next) => {
    res.render('404')
})



module.exports = app