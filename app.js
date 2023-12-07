let express = require("express")()
const cookieParser = require('cookie-parser');
express.use(cookieParser())
let auth = require("./lib/auth.js")

let apiRouter = require("./lib/routers/api.js")

express.get("/", function(req, res) {
    res.sendFile(__dirname + "/static/html/index.html")
})
express.get("/static/*", function(reg, res) {
    res.sendFile(__dirname + reg.originalUrl)
})
express.get("/auth/login", function(req, res) {
    res.redirect(auth.getLoginUrl())
})
express.get("/auth", function(req, res) {
    let code = req.query.code
    auth.getAccessToken(code, function(data) {
        if(data != null) {
            res.cookie("access_token", data["access_token"], { httpOnly: false })
            res.redirect("/main")
        } else {
            res.redirect("/")
        }
    })
})

express.use(auth.authMiddleware)
express.get("/main", function(req, res) {
    res.sendFile(__dirname + "/static/html/main.html")
})

express.use("/api", apiRouter)

express.listen(3000, () => {
    console.log("Running")
})