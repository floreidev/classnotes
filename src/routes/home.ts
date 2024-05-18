import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    if (req.isUnauthenticated()) return res.redirect("/signup")
    res.render("home", {user: req.user})
})

export default router;