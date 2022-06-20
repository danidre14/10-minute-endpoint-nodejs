const express = require("express");
const router = express.Router();
// Use the session middleware

const User = require("../models/User");
const Log = require("../models/Log");

// Access the session as req.session
// router.get('/', function (req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })

router.get("/logs/:endpoint", async function (req, res) {
    const endpoint = req.params.endpoint;
    const user = await User.findById(endpoint);

    if (!user)
        return res.status(404).json({});

    const logs = await Log.findByUserId(endpoint);

    res.status(200).json(logs);
});

module.exports = router;