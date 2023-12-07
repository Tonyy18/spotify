let router = require("express").Router()
let player = require("./player.js")

//Specified all api routes under /api path
router.use("/player", player)

module.exports = router