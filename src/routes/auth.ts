import express from 'express';
import nodemailer from 'nodemailer'
import User from '../models/users';
import bcrypt from "bcrypt"
import passport from 'passport';

// var codes = {}
// var preRegistration = {}

const router = express.Router();


// const mailer = nodemailer.createTransport({
//     service: "yahoo",
//     secure: false,

//     auth: {
//         user: process.env.EMAIL_EMAIL,
//         pass: process.env.EMAIL_PWD
//     }
// })

// const getValidationMail = (username: string, email: string) => {
//     //@ts-ignore
//     codes[username] = Math.random().toString().substring(2)
//     return {
//         from: process.env.EMAIL_EMAIL,
//         to: email,
//         subject: 'Class Notes Verification.',
//         //@ts-ignore
//         text: `${codes[username]} is your Class Notes verification code`,
//         //@ts-ignore
//         html: `<a href="http://localhost:3000/auth/verify?code=${codes[username]}&username=${username}">Click here to verify your account.</a>`
//     }
// }


router.post("/register/:strategy", async (req, res) => {
    switch (req.params.strategy.toLowerCase()) {
        default:
        case "local":
            const username = req.body.cnUsername, unhashedPwd = req.body.cnPassword, unhashedConfirmPwd = req.body.cnPasswordV, email = req.body.cnEmail;
            if (username.length > 20 || username.length < 1) return res.json({ clientMessage: "Username must be between 1 and 20 characters." })
            if (unhashedPwd != unhashedConfirmPwd) return res.json({ clientMessage: "Passwords do not match." })
            if (!(/^[a-zA-Z0-9_.]{1,30}$/g).test(username)) return res.json({ clientMessage: "Username must only contain a-z, 0-9, _ and ." })
            if (email.indexOf("@") == -1) return res.json({clientMessage: "Email is not correct."})
            const exists = await User.exists({username})
            if (exists) return res.json({clientMessage: "Username is already registered."})
            const pwd = await bcrypt.hash(unhashedPwd, parseInt(process.env.SALT_ROUNDS || "10"));
            const user = {
                username,
                password: pwd,
                email
            }
            //@ts-ignore
            // preRegistration[username] = user;
            // mailer.sendMail(getValidationMail(username, email)).then((v) => {
            //     console.log(v);
            // }).catch((err) => console.log(err));
            const createdUser = await User.create(user);
            req.login({id: user.username}, (err) => {
                if(err)
                console.log(err);
                else return res.json({clientRedirect: "http://localhost:3000/on-boarding"})
            })
            break;
    }
})


router.get("/verify", async (req, res) => {

})

router.post("/login", passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
}))



export default router;