import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {isLoggedIn: req.isAuthenticated()})
})

export default router;