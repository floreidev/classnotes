import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import User from "../models/users";
import bcrypt from "bcrypt"
import mongoose from "mongoose";



export default (passport: PassportStatic) => {
    passport.use(new LocalStrategy((username, password, cb) => {
        console.log(username, password);
        User.findOne({ username: username }).then((user) => {
            if (!user || !user.password || !user.username) return cb(null, false, { message: "Incorrect username or password." });
            bcrypt.compare(password, user.password, (err, same) => {
                if (err) return cb(err);
                if (!same) return cb(null, false, { message: "Incorrect username or password." })
                return cb(null, user);
            })
        }).catch((err) => cb(err, false));
    }))

    passport.serializeUser((user, cb) => {
        console.log(user);
        process.nextTick(() => {
            ///@ts-ignore
            cb(null, { username: user.username })
        })
    })

    passport.deserializeUser((id, cb) => {
        console.log(id);
        //@ts-ignore
        User.findOne({username: id.username}).then((v) => {
        //@ts-ignore
            v.password = null;
            cb(null, v);
        }).catch((err) => cb(err, false));
    })
}